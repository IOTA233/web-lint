import path from 'node:path'
import fsp from 'node:fs/promises'
import process from 'node:process'
import c from 'picocolors'
import * as p from '@clack/prompts'

import { dependenciesMap, scriptsMap, pkgJson } from '../constants'
import type { PromtResult } from '../types'

export async function updatePackageJson(result: PromtResult) {
  const cwd = process.cwd()

  const pathPackageJSON = path.join(cwd, 'package.json')

  p.log.success(c.cyan('更新 package.json'))

  const pkgContent = await fsp.readFile(pathPackageJSON, 'utf-8')
  const pkg: Record<string, any> = JSON.parse(pkgContent)

  pkg.devDependencies ??= {}

  const addedScripts: string[] = []
  const addedPackages: string[] = []
  for (const lint of result.lints) {
    const script = scriptsMap[lint]
    if (script) {
      script.forEach((f: { [key: string]: any }) => {
        for (const key in f) {
          if (Object.prototype.hasOwnProperty.call(f, key)) {
            pkg.scripts[key] = f[key]
            addedScripts.push(`${key}: ${f[key]}`)
          }
        }
      })
    }
    const deps = dependenciesMap[lint]
    if (deps) {
      deps.forEach((f) => {
        pkg.devDependencies[f] = pkgJson.devDependencies[f]
        addedPackages.push(f)
      })
    }
  }

  if (addedScripts.length) {
    p.note(`${c.dim(addedScripts.join('\n'))}`, 'Added scripts')
  }
  if (addedPackages.length) {
    p.note(`${c.dim(addedPackages.join('\n'))}`, 'Added packages')
  }

  await fsp.writeFile(pathPackageJSON, JSON.stringify(pkg, null, 2))
}
