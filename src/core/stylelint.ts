import fs from 'fs-extra'
import { removeDevDependencies, writeInPkg } from '../utils/tool'
import { getStylelintConfig } from '../cli/config/stylelintrc'
import { getpath } from '../utils/path'
import { getPackageJson } from '../utils/env'

const baseDep = [
  'stylelint@^16.3.1',
  'stylelint-config-recess-order@^5.0.0',
  'stylelint-config-recommended-vue@^1.5.0',
  'stylelint-config-standard-scss@^13.1.0',
  '@stylistic/stylelint-plugin@^2.1.1',
]

const stylelintignore = `
node_modules
dist
 `
const stylelintignoreInit = async () => {
  fs.outputFileSync(getpath('.stylelintignore'), stylelintignore)
}

export const styleInit = async () => {
  stylelintignoreInit()
  const pkgJson = await getPackageJson()

  // 删除已安装的stylelint相关包
  removeDevDependencies(pkgJson, 'stylelint')
  pkgJson.scripts['lint:style'] = 'stylelint --fix ./**/*.{css,scss,vue,html}'

  // writeInPkg 把依赖写入到package中
  await writeInPkg(baseDep, 'devDependencies', pkgJson)

  fs.outputFileSync(getpath('./.stylelintrc.json'), getStylelintConfig())
}
