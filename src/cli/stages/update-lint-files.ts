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

export async function updateLintFiles({ tools, configDir, clearCacheConfirmed }: PromtResult) {
  const originPath = process.cwd()
  let finalPath = process.cwd()
  const files: Array<string> = []
  if (configDir) {
    finalPath = path.join(originPath, configDir)
    await fsp.mkdir(finalPath, { recursive: true })
  }
  for (const tool of tools) {
    const item = configsMap[tool]
    if (item) {
      for (const {
        config, file, type, unSupportChangePath, relateFiles,
      } of item as any) {
        const analyse = typeof config === 'function' ? config(configDir) : config
        const configFile = path.join(finalPath, file)
        const originFile = path.join(originPath, file)
        let res = analyse
        // 如果存在旧的ignore配置，合并
        if (type === 'ignoreFile') {
          if (fs.existsSync(originFile)) {
            res = await mergePatterns(originFile, analyse)
          } else if (fs.existsSync(configFile)) {
            res = await mergePatterns(configFile, analyse)
          }
        }

        // 删除所有相关的配置文件
        if (clearCacheConfirmed) {
          if (relateFiles?.length) {
            relateFiles.forEach(async (fileName: string) => {
              const temp = path.join(originPath, fileName)
              if (fs.existsSync(temp)) {
                await fsp.unlink(temp)
              }
            })
          }
        }

        // todo stylelintignore 暂不支持自定义文件目录
        if (unSupportChangePath) {
          await fsp.writeFile(originFile, res)
        } else {
          await fsp.writeFile(configFile, res)
        }
        files.push(file)
      }
    }
  }
  if (files.length) {
    p.log.success(c.cyan('创建配置文件'))
    p.note(`${c.dim(files.join('\n'))}`, configDir)
  }
}

async function mergePatterns(originFile: string, config: string) {
  const content = await fsp.readFile(originFile, 'utf-8')
  const oldPatterns = parse(content).patterns
  const newPatterns = parse(config).patterns
  const mergedPatterns = [...new Set([...oldPatterns, ...newPatterns])]
  return mergedPatterns.join('\n')
}
