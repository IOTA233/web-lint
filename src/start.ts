// 开始分析项目
import { debugError, debugInfo } from './utils/debug'
import { eslintInit } from './core/eslint'
import { styleInit } from './core/stylelint'
import { prettierInit } from './core/pretter'
import { huskyInit } from './core/husky'
import { vscodeInit } from './core/vscode'
import { revertScript, clearUselessScript } from './core/package'
import { downNodeModules } from './utils/tool'

export const start = async (packages: Array<string>) => {
  try {
    // await packageInit()
    if (packages.includes('eslint')) {
      await eslintInit()
    }
    if (packages.includes('stylelint')) {
      await styleInit()
    }
    if (packages.includes('prettier')) {
      await prettierInit()
    }
    if (packages.includes('commitlint')) {
      await huskyInit()
    }
    await vscodeInit()
    await downNodeModules()
    clearUselessScript()
    debugInfo('Done!')
  } catch (error: any) {
    revertScript()
    debugError(error?.message)
  }
}
