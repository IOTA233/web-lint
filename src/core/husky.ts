import fs from 'fs-extra'
import { writeInPkg, run } from '../utils/tool'
import { getpath } from '../utils/path'
import { pathExists, checkPackageManage } from '../utils/check'
import { getLintstageConfig } from '../config/lintstagedrc'
import { getPreCommitConfig } from '../config/commitlintrc'
import { getPackageJson } from '../utils/env'

// 需要安装的依赖
const devDependencies = [
  'husky@^9.0.1',
  'lint-staged@^15.2.2',
  '@commitlint/cli@^19.2.1',
  '@commitlint/config-conventional@^19.1.0',
]

export const huskyInit = async () => {
  // 检查是否有git 如果没有 需要先初始化git
  if (!await pathExists('.git', false)) {
    // 抛出错误，清除已加的配置
    throw new Error('检测不到.git目录，请先初始化git。参考命令: git init')
  }
  // 安装依赖
  await writeInPkg(devDependencies)

  const pkgJson = await getPackageJson()
  pkgJson.scripts['add:lint'] = 'echo npx --no -- lint-staged > .husky/pre-commit'
  // eslint-disable-next-line no-useless-escape
  pkgJson.scripts['add:msg'] = 'echo npx --no -- commitlint -e \$HUSKY_GIT_PARAMS > .husky/commit-msg'
  fs.writeJsonSync(getpath('package.json'), pkgJson, { spaces: 2 })

  fs.outputFileSync(getpath('.commitlintrc.js'), getPreCommitConfig())
  fs.outputFileSync(getpath('.lintstagedrc.js'), getLintstageConfig())
  const manager = await checkPackageManage()
  await run('npx husky init')
  await run(`${manager[0]} run add:lint`)
  // eslint-disable-next-line no-useless-escape
  await run(`${manager[0]} run add:msg`)
}
