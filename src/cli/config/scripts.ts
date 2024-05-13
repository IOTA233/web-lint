import { ToolOption } from '../types'

export function scriptsConfig(tool: ToolOption, dir: string) {
  const map = {
    eslint:
       { 'lint:script': `eslint --ext .js,.jsx,.ts,.tsx,.vue --fix ./ -c ${dir}.eslintrc.js --ignore-path ${dir}.eslintignore` },
    stylelint:
       { 'lint:style': `stylelint --fix ./**/*.{css,scss,vue,html} -c ${dir}.stylelintrc.json` },
    prettier: null,
    commitlint: { prepare: `simple-git-hooks ${dir}.simple-git-hooks.json` },
  }
  return map[tool]
}
