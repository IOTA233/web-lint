/* eslint-disable no-console */
// 解析命令行参数以及获取脚本运行的路径
import cac from 'cac'
import { prompt } from 'enquirer'
import chalk from 'chalk'
import { start } from './start'
import { setEnv } from './utils/env'

const cli = cac('web-lint')
const cliInit = () => {
  cli
    .command('[root]')
    .action(async (_root, options) => {
      const title = '*** 欢迎使用web-lint工具 ***'
      const padding = Math.max(0, (process.stdout.columns - title.length) / 3)
      console.log('*'.repeat(padding) + title + '*'.repeat(padding))
      let packages: Array<string> = []
      await prompt([{
        type: 'multiselect',
        name: 'value',
        initial: [0, 1, 2, 3],
        message: '选择需要安装的依赖（按【空格键】选择，按【A键】全选，按【enter键】进入下一步）',
        // @ts-ignore
        choices: ['eslint', 'stylelint', 'prettier', 'husky'],
      }]).then((answer: any) => {
        packages = answer.value
        if (!packages.length) {
          console.log(chalk.yellow('未选中依赖，退出'))
          process.exit(0)
        }
        console.log('即将安装选中依赖，创建依赖的配置文件')
        console.log(chalk.yellow('注意：同名的配置文件、.vscode/settings.json，将被覆盖，请确认无误再执行！'))
      }).catch(() => {
        process.exit(0)
      })

      await prompt([
        {
          type: 'confirm', // 交互类型 -- 单选（无序）
          initial: true,
          message: '确认执行', // 引导词
          name: 'confirm', // 自定义的字段名
        },
      ]).then(async (answer: any) => {
        if (!answer.confirm) {
          process.exit(0)
        }

        let { base } = options
        if (!base) {
          // 项目的最终路径
          base = process.cwd()
        }
        setEnv('base', base)

        await start(packages)
      }).catch(() => {
        process.exit(0)
      })
    })

  cli.help()
  cli.version('1.0.0')
  cli.parse()
}

export default cliInit
