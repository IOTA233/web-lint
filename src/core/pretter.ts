import fs from 'fs-extra'
import { writeInPkg } from '../utils/tool'
import { getPrettierConfig } from '../config/prettierrc'
import { getpath } from '../utils/path'

const baseDep = [
  'prettier@^3.2.5',
  'pretty-quick@^4.0.0',
]

const prettierignore = `
node_modules
dist
 `
const prettierignoreInit = async () => {
  fs.outputFileSync(getpath('.prettierignore'), prettierignore)
}

export const prettierInit = async () => {
  prettierignoreInit()
  // writeInPkg 把依赖写入到package中
  await writeInPkg(baseDep, 'devDependencies')
  fs.outputFileSync(getpath('./.prettierrc.js'), getPrettierConfig())
}
