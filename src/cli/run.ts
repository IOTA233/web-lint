import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import c from 'picocolors'
import * as p from '@clack/prompts'

import {
  toolOptions, tools,
} from './constants'
import { isGitClean } from './utils'
import type {
  ToolOption, PromItem, PromtResult,
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
  tools?: string[]
}

export async function run(options: CliRunOptions = {}) {
  const argSkipPrompt = !!process.env.SKIP_PROMPT || options.yes
  const argTemplate = <ToolOption[]>options.tools?.map((m) => m.trim())

  if (fs.existsSync(path.join(process.cwd(), 'eslint.config.js'))) {
    p.log.warn(c.yellow('eslint.config.js already exists, migration wizard exited.'))
    return process.exit(1)
  }

  // Set default value for promtResult if `argSkipPromt` is enabled
  let result: PromtResult = {
    tools: argTemplate ?? [],
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
      tools: ({ results }) => {
        const isArgTemplateValid = typeof argTemplate === 'string' && !!tools.includes(<ToolOption>argTemplate)

        if (!results.uncommittedConfirmed || isArgTemplateValid) return Promise.resolve(null)

        const message = !isArgTemplateValid && argTemplate ?
          `"${argTemplate}" 属于错误的模板. 请在下方选择: ` :
          '选择需要安装的lint工具:'

        return p.multiselect<PromItem<ToolOption>[], ToolOption>({
          message: c.reset(message),
          options: toolOptions,
          initialValues: ['eslint', 'stylelint', 'prettier', 'commitlint'],
          required: true,
        })
      },

      updateVscodeSettings: ({ results }) => {
        if (!results.uncommittedConfirmed) return Promise.resolve(null)

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
  await start(result.tools)
  // await updatePackageJson(result)
  // await updateEslintFiles(result)
  // await updateVscodeSettings(result)

  p.log.success(c.green('配置完成，请进行依赖包的更新！'))
}
