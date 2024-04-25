import fs from 'fs-extra'
import { env, getPackageJson } from '../utils/env'
import { getpath } from '../utils/path'

export const packageInit = async () => {
  const { isVue3 } = env
  const pkgJson = await getPackageJson()

  if (isVue3 && pkgJson.type) {
    // vue3需要把package中的 type="module"去掉
    // delete pkgJson.type;
  }
  fs.writeJsonSync(getpath('package.json'), pkgJson, { spaces: 2 })
}

/**
 * 仅作为运行时的script
 */
export const clearUselessScript = async () => {
  const pkgJson = await getPackageJson()
  const list = ['add:lint', 'add:msg']
  list.forEach((item) => delete pkgJson.scripts[item])
  fs.writeJsonSync(getpath('package.json'), pkgJson, { spaces: 2 })
}

/**
 * 运行失败时，清除script
 */
export const revertScript = async () => {
  const pkgJson = await getPackageJson()
  const list = ['lint:script', 'lint:style', 'add:lint', 'add:msg', 'prepare']
  list.forEach((item) => delete pkgJson.scripts[item])
  fs.writeJsonSync(getpath('package.json'), pkgJson, { spaces: 2 })
}
