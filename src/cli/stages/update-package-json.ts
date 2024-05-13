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
  for (const tool of result.tools) {
    const script = scriptsMap[tool]
    if (script) {
      const obj = script(result.configDir) as any
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          pkg.scripts[key] = obj[key]
          addedScripts.push(`${key}: ${obj[key]}`)
        }
      }
    }
    const deps = dependenciesMap[tool]
    if (deps) {
      deps.forEach((f) => {
        pkg.devDependencies[f] = pkgJson.devDependencies[f]
        addedPackages.push(f)
      })
    }
  }

  if (addedScripts.length) {
    p.note(`${c.dim(addedScripts.join('\n'))}`, 'scripts')
  }
  if (addedPackages.length) {
    p.note(`${c.dim(addedPackages.join('\n'))}`, 'devDependencies')
  }

  await fsp.writeFile(pathPackageJSON, JSON.stringify(pkg, null, 2))
}
