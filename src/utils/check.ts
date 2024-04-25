// 各种检测函数
import fs from 'fs-extra'
import { debugError } from './debug'
import { getEnv } from './env'
/**
 * @name 判断文件夹存不存在
 */
export const pathExists = async (name: string, ext: boolean = true): Promise<boolean | void> => {
  const base = getEnv('base') as string
  const res = await fs.pathExists(`${base}/${name}`)
  if (!res) {
    if (ext) {
      debugError(`${base}/${name}不存在`)
    }
    return false
  }
  return res
}

/**
 * @name 判断是哪个vue版本
 */
export const checkVueVersion = (version: string) => {
  const v = version.split('.')[0] as string
  return Number(v.match(/\d+/g))
}

/**
 * @name 判断使用的包管理器
 */
export const checkPackageManage = async (): Promise<string[]> => {
  // 如果原项目使用的是yarn进行安装的，那还是使用npm进行按照，否则就使用npm
  if (await pathExists('yarn.lock', false)) {
    return ['yarn', 'add']
  } if (await pathExists('pnpm-lock.yaml', false)) {
    return ['pnpm', 'add']
  }
  return ['npm', 'i']
}
