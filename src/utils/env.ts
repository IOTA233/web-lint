import path from 'path'
import fs from 'fs-extra'

export const env = {
  base: '',
  isVue: false,
  isVue3: false,
  isReact: false,
  isVue2: false,
  isVueCli: false,
  isWebpack: true,
  isEslint: false,
}

type EnvKeys = keyof typeof env

/**
 * @name 设置变量
 */
export const setEnv = (key: EnvKeys, val: any) => {
  env[key] = val as never
}
/**
 * @name 获取变量
 */
export const getEnv = (key: EnvKeys) => env[key]

/**
 * @name 检测是否包含指定文件
 *
 */
export const existsSync = (fileName: string, base: string = getEnv('base') as string) => {
  const file = path.resolve(base, fileName)
  return fs.existsSync(file)
}

/**
 * @name 获取指定文件，并转化为json
 *
 */
export const getFiletoJson = async (fileName: string, base: string = getEnv('base') as string) => {
  const file = path.resolve(base, fileName)
  const res = fs.existsSync(file)
  if (!res) return false
  const json = fs.readJSON(file)
  return json
}
/**
 * @name 把package.json转化为json
 */
export const getPackageJson = async (base: string = getEnv('base') as string) => getFiletoJson('package.json', base)

/**
 * @name 获取eslintrc
 */
export const getEslintrc = async (base: string = getEnv('base') as string) => {
  const file = path.resolve(base, '.eslintrc.js')
  const res = fs.existsSync(file)
  if (!res) return false
  const eslintStr = await fs.readFile(file, 'utf8')
  // eslint-disable-next-line no-eval
  return eval(eslintStr)
}
