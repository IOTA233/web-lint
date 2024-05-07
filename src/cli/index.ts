import process from 'node:process'
import c from 'picocolors'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs'
import * as p from '@clack/prompts'
import { run } from './run'
import { pkgJson } from './constants'

const pkgName = '@zhdgps/web-lint'

function header() {
  // eslint-disable-next-line no-console
  console.log('\n')
  p.intro(`${c.green(pkgName)}: ${c.dim(`v${pkgJson.version}`)}`)
}

const instance = yargs(hideBin(process.argv))
  .scriptName(pkgName)
  .usage('')
  .command(
    '*',
    'Run the initialization or migration',
    (args) => args
      .option('yes', {
        alias: 'y',
        description: '默认全量安装',
        type: 'boolean',
      })
      .help(),
    async (args) => {
      header()
      try {
        await run(args)
      } catch (error) {
        p.log.error(c.inverse(c.red(' Failed to migrate ')))
        p.log.error(c.red(`✘ ${String(error)}`))
        process.exit(1)
      }
    },
  )
  .showHelpOnFail(false)
  .alias('h', 'help')
  .version('version', pkgJson.version)
  .alias('v', 'version')

const cliInit = () => {
  instance
    .help()
    .argv
}
export default cliInit
