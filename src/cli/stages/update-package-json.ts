import path from 'node:path'
import fsp from 'node:fs/promises'
import process from 'node:process'
import c from 'picocolors'
import * as p from '@clack/prompts'

import { dependenciesMap, pkgJson } from '../constants'
import type { PromtResult } from '../types'

export async function updatePackageJson(result: PromtResult) {
  const cwd = process.cwd()

  const pathPackageJSON = path.join(cwd, 'package.json')

  p.log.step(c.cyan(`Bumping @antfu/eslint-config to v${pkgJson.version}`))

  const pkgContent = await fsp.readFile(pathPackageJSON, 'utf-8')
  const pkg: Record<string, any> = JSON.parse(pkgContent)

  pkg.devDependencies ??= {}
  pkg.devDependencies['@antfu/eslint-config'] = `^${pkgJson.version}`
  pkg.devDependencies.eslint ??= pkgJson.devDependencies.eslint
    .replace('npm:eslint-ts-patch@', '')
    .replace(/-\d+$/, '')

  const addedPackages: string[] = []
  for (const lint of result.lints) {
    const deps = dependenciesMap[lint]
    if (deps) {
      deps.forEach((f) => {
        pkg.devDependencies[f] = pkgJson.devDependencies[f]
        addedPackages.push(f)
      })
    }
  }

  if (addedPackages.length)
    p.note(`${c.dim(addedPackages.join(', '))}`, 'Added packages')

  await fsp.writeFile(pathPackageJSON, JSON.stringify(pkg, null, 2))
  p.log.success(c.green(`Changes wrote to package.json`))
}
