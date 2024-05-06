import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import c from 'picocolors'
import * as p from '@clack/prompts'

import {
  lintOptions, lints,
} from './constants'
import { isGitClean } from './utils'
import type {
  LintOption, PromItem, PromtResult,
} from './types'
// import { updatePackageJson } from './stages/update-package-json'
// import { updateEslintFiles } from './stages/update-eslint-files'
// import { updateVscodeSettings } from './stages/update-vscode-settings'
import { start } from '../start'

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

  if (fs.existsSync(path.join(process.cwd(), 'eslint.config.js'))) {
    p.log.warn(c.yellow('eslint.config.js already exists, migration wizard exited.'))
    return process.exit(1)
  }

  // Set default value for promtResult if `argSkipPromt` is enabled
  let result: PromtResult = {
    lints: [],
    uncommittedConfirmed: false,
    updateVscodeSettings: true,
  }

  if (!argSkipPrompt) {
    result = await p.group({
      uncommittedConfirmed: () => {
        if (argSkipPrompt || isGitClean()) return Promise.resolve(true)

        return p.confirm({
          initialValue: false,
          message: '监测到尚未提交的代码，是否确认继续执行？',
        })
      },
      lints: ({ results }) => {

        if (!results.uncommittedConfirmed) return Promise.resolve(false)

        const message = 
          '选择需要安装的lint工具:'

        return p.multiselect<PromItem<LintOption>[], LintOption>({
          message: c.reset(message),
          options: lintOptions,
          initialValues: ['eslint', 'stylelint', 'prettier', 'commitlint'],
          required: true,
        })
      },

      updateVscodeSettings: ({ results }) => {
        if (!results.uncommittedConfirmed || !result.lints) return Promise.resolve(false)

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
  await start(result.lints)
  // await updatePackageJson(result)
  // await updateEslintFiles(result)
  // await updateVscodeSettings(result)

  p.log.success(c.green('配置完成，请进行依赖包的更新！'))
}
