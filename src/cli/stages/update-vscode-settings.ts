import path from 'node:path'
import fsp from 'node:fs/promises'
import fs from 'node:fs'
import process from 'node:process'
import c from 'picocolors'
import * as p from '@clack/prompts'

import { vscodeConfig } from '../config/vscode'
import type { PromtResult } from '../types'

export async function updateVscodeSettings(result: PromtResult) {
  const cwd = process.cwd()

  if (result.vscodeConfirmed) {
    const dotVscodePath: string = path.join(cwd, '.vscode')
    const settingsPath: string = path.join(dotVscodePath, 'settings.json')

    if (!fs.existsSync(dotVscodePath)) await fsp.mkdir(dotVscodePath, { recursive: true })

    await fsp.writeFile(settingsPath, `${vscodeConfig(result.configDir)}`, 'utf-8')
    p.log.success(c.green('更新 .vscode/settings.json'))
  }
}
