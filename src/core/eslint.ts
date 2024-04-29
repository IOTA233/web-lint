import fs from 'fs-extra'
import { removeDevDependencies, writeInPkg } from '../utils/tool'
import { getPackageJson } from '../utils/env'
import { eslintConfigContent } from '../cli/config/eslintrc'
import { getpath } from '../utils/path'

const baseDep = [
  '@typescript-eslint/eslint-plugin@^7.6.0',
  '@typescript-eslint/parser@^7.6.0',
  'eslint@^8.0.0',
  'eslint-config-airbnb-base@^15.0.0',
  'eslint-config-airbnb-typescript@^18.0.0',
  'eslint-define-config@^2.1.0',
  'eslint-plugin-import@^2.29.1',
  'vue-eslint-parser@^9.4.2',
  'eslint-plugin-vue@^9.24.1',
]

const eslintignore = `
node_modules
dist

!.eslintrc.js
!.stylelintrc.js
!.lintstagedrc.js
!.commitlintrc.js
 `
const eslintignoreInit = async () => {
  fs.outputFileSync(getpath('.eslintignore'), eslintignore)
}

export const eslintInit = async () => {
  eslintignoreInit()
  const pkgJson = await getPackageJson()
  // 删除已安装的eslint相关包
  removeDevDependencies(pkgJson, 'eslint')
  pkgJson.scripts['lint:script'] = 'eslint --ext .js,.jsx,.ts,.tsx,.vue --fix ./'

  if (pkgJson.eslintConfig) {
    delete pkgJson.eslintConfig
  }
  // writeInPkg 把依赖写入到package中
  await writeInPkg(baseDep, 'devDependencies', pkgJson)
  fs.writeJsonSync(getpath('package.json'), pkgJson, { spaces: 2 })
  fs.outputFileSync(getpath('./.eslintrc.js'), eslintConfigContent)
}
