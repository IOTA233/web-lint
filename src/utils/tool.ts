import spawn from 'cross-spawn'
import fs from 'fs-extra'

import { getEnv, getPackageJson } from './env'
import { checkPackageManage } from './check'
import { getpath } from './path'

import { debugInfo, debugWarning } from './debug'

export function spawnSync(n: string, i: string, runItem: string, type: string, basePath: string) {
  return new Promise((resolve) => {
    spawn.sync(n, [i, runItem, type], {
      stdio: 'pipe',
      cwd: basePath,
    })
    debugInfo(`${runItem}✅`)

    resolve({ success: true })
  })
}

export const down = async (runName: string | string[], type: string) => {
  const basePath = getEnv('base') as string
  const [n, i] = await checkPackageManage()
  if (typeof runName === 'string') {
    await spawnSync(n, i, runName, type, basePath)
    return
  }
  runName.forEach(async (runItem) => {
    await spawnSync(n, i, runItem, type, basePath)
  })
}
/**
 * @name 写入依赖
 */

/**
 *  @name 睡眠函数
 *  @param numberMillis -- 要睡眠的毫秒数
 */
export const sleep = (numberMillis: number) => {
  let now = new Date()
  const exitTime = now.getTime() + numberMillis
  while (true) {
    now = new Date()
    if (now.getTime() > exitTime) return
  }
}

export const writeInPkg = async (devArr: string[], key: string = 'devDependencies', defaultPkg = null) => {
  const pkg = defaultPkg || await getPackageJson()
  devArr.forEach((item: string) => {
    // 为了防止安装包里面的名字有@
    const index = item.lastIndexOf('@')
    const k = index === -1 ? item : item.slice(0, index)
    const v = index === -1 ? '' : item.slice(index + 1) || ''
    pkg[key][k] = v
    debugInfo(`${item}✅`)
    sleep(Math.random() * 500)
  })
  fs.writeJsonSync(getpath('package.json'), pkg, { spaces: 2 })
}

export const run = async (str: string) => {
  const basePath = getEnv('base') as string
  const runArr = str.split(' ')
  if (runArr.length < 2) {
    debugWarning(`运行参数错误${str}`)
    throw new Error('')
  }
  const [npm, ...args] = runArr
  debugInfo(`${runArr.join(' ')}✅`)
  spawn.sync(npm, args, {
    stdio: 'inherit',
    cwd: basePath,
  })
}

export const downNodeModules = async () => {
  const [n] = await checkPackageManage()
  await run(`${n} install`)
}

export const removeDevDependencies = (pkg: any, filter: string) => {
  Object.keys(pkg.devDependencies)
    .filter((key) => key.includes(filter))
    .forEach((key) => {
      delete pkg.devDependencies[key]
    })
}
