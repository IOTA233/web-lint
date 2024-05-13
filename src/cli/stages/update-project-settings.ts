import c from 'picocolors'
import * as p from '@clack/prompts'
import { PromtResult } from '../types'
import { resetHookPath } from '../utils'

export function updateProjectSettings({ tools }: PromtResult) {
  if (tools.includes('commitlint')) {
    p.log.success(c.green(`重置hook：${resetHookPath()}`))
  }
}
