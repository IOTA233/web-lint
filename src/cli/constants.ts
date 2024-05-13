import c from 'picocolors'
import pkgJson from '../../package.json'
import type { ToolOption, PromItem } from './types'
import {
  lintstageConfig, commitlintConfig, hooksConfig, eslintConfig,
  eslintIgnoreContent, stylelintConfig, stylelintIgnoreContent,
  prettierConfig, prettierIgnoreContent,
} from './config/index'

export { pkgJson }

export const toolOptions: PromItem<ToolOption>[] = [
  {
    label: c.green('Eslint'),
    value: 'eslint',
  },
  {
    label: c.cyan('Stylelint'),
    value: 'stylelint',
  },
  {
    label: c.red('Prettier'),
    value: 'prettier',
  },
  {
    label: c.magenta('Commitlint'),
    value: 'commitlint',
  },
]
export const pathOptions: PromItem<string>[] = [
  {
    label: c.green('是(lint-config)'),
    value: 'yes',
  },
  {
    label: c.yellow('是(自定义目录)'),
    value: 'custom',
  },
  {
    label: c.red('否'),
    value: 'no',
  },
]

export const tools: ToolOption[] = toolOptions.map(({ value }) => (value))

export const dependenciesMap = {
  eslint: [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'eslint',
    'eslint-config-airbnb-base',
    'eslint-config-airbnb-typescript',
    'eslint-define-config',
    'eslint-plugin-import',
    'vue-eslint-parser',
    'eslint-plugin-vue',
  ],
  stylelint: [
    'stylelint',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-vue',
    'stylelint-config-standard-scss',
    '@stylistic/stylelint-plugin',
  ],
  prettier: [
    'prettier',
  ],
  commitlint: [
    'simple-git-hooks',
    'lint-staged',
    '@commitlint/cli',
    '@commitlint/config-conventional',
  ],
} as const

export const scriptsMap = {
  eslint:
    (dir: string) => ({ 'lint:script': `eslint --ext .js,.jsx,.ts,.tsx,.vue --fix ./ -c ${dir}.eslintrc.js --ignore-path ${dir}.eslintignore` }),
  stylelint:
    (dir: string) => ({ 'lint:style': `stylelint --fix ./**/*.{css,scss,vue,html} -c ${dir}.stylelintrc.json` }),
  prettier: null,
  commitlint: (dir: string) => ({ prepare: `simple-git-hooks ${dir}.simple-git-hooks.json` }),
} as const

export const configsMap = {
  eslint: [
    {
      config: eslintConfig,
      file: '.eslintrc.js',
      relateFiles: ['.eslintrc.js', '.eslintrc.cjs', '.eslintrc.yaml', '.eslintrc.yml', '.eslintrc.json'],
    },
    {
      config: eslintIgnoreContent,
      type: 'ignoreFile',
      file: '.eslintignore',
      relateFiles: ['.eslintignore'],
    },
  ],
  stylelint: [
    {
      config: stylelintConfig,
      file: '.stylelintrc.json',
      relateFiles: ['stylelint.config.js', '.stylelintrc.js', 'stylelint.config.mjs', '.stylelintrc.mjs', 'stylelint.config.cjs', '.stylelintrc.cjs', '.stylelintrc.json', '.stylelintrc.yml', '.stylelintrc.yaml', '.stylelintrc'],
    },
    {
      config: stylelintIgnoreContent,
      type: 'ignoreFile',
      file: '.stylelintignore',
      // todo stylelintignore 暂不支持自定义文件目录
      unSupportChangePath: true,
      relateFiles: ['.stylelintignore'],
    },
  ],
  prettier: [
    {
      config: prettierConfig,
      file: '.prettierrc.js',
      relateFiles: ['.prettierrc', '.prettierrc.json', '.prettierrc.js', '.prettierrc.mjs', '.prettierrc.cjs', '.prettierrc.toml'],
    },
    {
      config: prettierIgnoreContent,
      type: 'ignoreFile',
      file: '.prettierignore',
      relateFiles: ['.prettierignore'],
    },
  ],
  commitlint: [
    {
      config: commitlintConfig,
      file: '.commitlintrc.js',
      relateFiles: ['.commitlintrc.js'],
    },
    {
      config: (dir: string) => lintstageConfig(dir),
      file: '.lintstagedrc.js',
      relateFiles: ['.lintstagedrc.js'],
    },
    {
      config: (dir: string) => hooksConfig(dir),
      file: '.simple-git-hooks.json',
      relateFiles: ['.simple-git-hooks.cjs', '.simple-git-hooks.js', 'simple-git-hooks.cjs', 'simple-git-hooks.js', '.simple-git-hooks.json', 'simple-git-hooks.json'],
    },
  ],
} as const
