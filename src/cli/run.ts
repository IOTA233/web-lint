import process from 'node:process'
import c from 'picocolors'
import * as p from '@clack/prompts'

import { detectPackageManager } from '@antfu/install-pkg'
import {
  lintOptions, lints,
} from './constants'
import { isGitClean } from './utils'
import type {
  LintOption, PromItem, PromtResult,
} from './types'
import { updatePackageJson } from './stages/update-package-json'
import { updateLintFiles } from './stages/update-lint-files'
import { updateVscodeSettings } from './stages/update-vscode-settings'

export interface CliRunOptions {
  /**
   * Skip prompts and use default values
   */
  yes?: boolean
  /**
   * Use the framework template for optimal customization: vue / react / svelte / astro
   */
  lints?: string[]
}

export async function run(options: CliRunOptions = {}) {
  const argSkipPrompt = !!process.env.SKIP_PROMPT || options.yes

  // 如果指令为默认安装，则按照以下默认配置进行安装
  let result: PromtResult = {
    lints,
    uncommittedConfirmed: false,
    organizeConfigConfirmed: true,
    clearCacheConfirmed: true,
    vscodeConfirmed: true,
  }

  if (!argSkipPrompt) {
    result = await p.group({
      uncommittedConfirmed: () => {
        if (isGitClean()) return Promise.resolve(true)

        return p.confirm({
          initialValue: false,
          message: '监测到尚未提交的代码，是否确认继续执行？',
        })
      },
      lints: () => {
        const message =
          '选择需要安装的lint工具:'

        return p.multiselect<PromItem<LintOption>[], LintOption>({
          message: c.reset(message),
          options: lintOptions,
          initialValues: lints,
          required: true,
        })
      },

      organizeConfigConfirmed: () => p.confirm({
        initialValue: true,
        message: '是否将配置文件移动到 .lint 文件夹，进行统一管理？',
      }),

      clearCacheConfirmed: ({ results }) => {
        // 修改了默认配置文件目录，才需要询问
        if (!results.organizeConfigConfirmed) {
          return Promise.resolve(false)
        }
        return p.confirm({
          initialValue: false,
          message: '是否清除旧的配置文件？',
        })
      },

      vscodeConfirmed: ({ results }) => {
        // 修改了默认配置文件目录，需要修改vscode配置
        if (results.organizeConfigConfirmed) {
          return Promise.resolve(true)
        }
        return p.confirm({
          initialValue: true,
          message: '替换 .vscode/settings.json 以获得更好的开发体验！',
        })
      },
    }, {
      onCancel: () => {
        p.cancel('任务取消！')
        process.exit(0)
      },
    }) as PromtResult

    if (!result.uncommittedConfirmed) return process.exit(1)
  }
  await updatePackageJson(result)
  await updateLintFiles(result)
  await updateVscodeSettings(result)

  const manager = await detectPackageManager()
  p.log.success(c.green(`配置完成，执行 ${manager} run install 更新依赖包\n`))

  return process.exit(0)
}
