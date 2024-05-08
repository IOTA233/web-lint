import fs from 'node:fs'
import fsp from 'node:fs/promises'
import process from 'node:process'
import path from 'node:path'
import c from 'picocolors'
import * as p from '@clack/prompts'
// @ts-expect-error missing types
import parse from 'parse-gitignore'
import { configsMap } from '../constants'

import type { PromtResult } from '../types'

export async function updateLintFiles({ lints, organizeConfigConfirmed }: PromtResult) {
  let cwd = process.cwd()
  const files: Array<string> = []
  if (organizeConfigConfirmed) {
    cwd = path.join(cwd, '.lint')
    await fsp.mkdir(cwd, { recursive: true })
  }
  for (const lint of lints) {
    const item = configsMap[lint]
    if (item) {
      for (const { config, file, type } of item as any) {
        const configFile = path.join(cwd, file)
        const originFile = path.join(process.cwd(), file)
        let res = config
        if (type === 'ignoreFile' && fs.existsSync(originFile)) {
          const content = await fsp.readFile(originFile, 'utf-8')
          const oldPatterns = parse(content).patterns
          const newPatterns = parse(config).patterns
          const merge = [...new Set(oldPatterns.concat(newPatterns))]
          res = merge.join('\n')
        }
        await fsp.writeFile(configFile, res)
        files.push(file)
      }
    }
  }
  if (files.length) {
    p.log.success(c.cyan('创建配置文件'))
    p.note(`${c.dim(files.join('\n'))}`, 'Added files')
  }
}
