import fsp from 'node:fs/promises'
import process from 'node:process'
import path from 'node:path'
import c from 'picocolors'
import * as p from '@clack/prompts'
import { configsMap } from '../constants'

import type { PromtResult } from '../types'

export async function updateLintFiles({ lints, ignoreFileConfirmed }: PromtResult) {
  const cwd = process.cwd()
  const files: Array<string> = []
  for (const lint of lints) {
    const item = configsMap[lint]
    if (item) {
      for (const { config, file, type } of item as any) {
        const configFile = path.join(cwd, file)
        if (type !== 'ignoreFile' || ignoreFileConfirmed) {
          await fsp.writeFile(configFile, config)
          files.push(file)
        }
      }
    }
  }
  if (files.length) {
    p.log.success(c.cyan('创建配置文件'))
    p.note(`${c.dim(files.join('\n'))}`, 'Added files')
  }
}
