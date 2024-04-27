import fs from 'node:fs'
import fsp from 'node:fs/promises'
import process from 'node:process'
import path from 'node:path'
import c from 'picocolors'
import * as p from '@clack/prompts'

// @ts-expect-error missing types
import parse from 'parse-gitignore'
import { eslintConfigContent } from '../config/eslintrc'
import type { PromtResult } from '../types'

export async function updateEslintFiles(result: PromtResult) {
  const cwd = process.cwd()
  const pathPackageJSON = path.join(cwd, 'package.json')

  const pkgContent = await fsp.readFile(pathPackageJSON, 'utf-8')
  const pkg: Record<string, any> = JSON.parse(pkgContent)

  const configFileName = pkg.type === 'module' ? '.eslintrc.js' : '.eslintrc.mjs'
  const pathFlatConfig = path.join(cwd, configFileName)

  await fsp.writeFile(pathFlatConfig, eslintConfigContent)
  p.log.success(c.green(`创建 ${configFileName}`))
}
