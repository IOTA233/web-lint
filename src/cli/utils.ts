import { execSync } from 'node:child_process'

export function isGitClean() {
  try {
    execSync('git diff-index --quiet HEAD --')
    return true
  } catch (error) {
    return false
  }
}

export function resetHookPath() {
  try {
    execSync('git config core.hooksPath')
    return 'git config core.hooksPath'
  } catch (error) {
    return ''
  }
}
