import c from 'picocolors'
import pkgJson from '../../package.json'
import type { LintOption, PromItem } from './types'
import {
  lintstageConfigContent, commitlintConfigContent, hooksContent, vscodeContent, eslintConfigContent,
  eslintIgnoreContent, stylelintConfigContent, stylelintIgnoreContent,
  prettierConfigContent, prettierIgnoreContent,
} from './config/index'

export { pkgJson }

export const vscodeSettingsString = vscodeContent

export const lintOptions: PromItem<LintOption>[] = [
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

export const lints: LintOption[] = lintOptions.map(({ value }) => (value))

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
  eslint: [
    { 'lint:script': 'eslint --ext .js,.jsx,.ts,.tsx,.vue --fix ./' },
  ],
  stylelint: [
    { 'lint:style': 'stylelint --fix ./**/*.{css,scss,vue,html}' },
  ],
  prettier: [
  ],
  commitlint: [
  ],
} as const

export const configsMap = {
  eslint: [
    {
      config: eslintConfigContent,
      file: '.eslintrc.js',
    },
    {
      config: eslintIgnoreContent,
      type: 'ignoreFile',
      file: '.eslintignore',
    },
  ],
  stylelint: [
    {
      config: stylelintConfigContent,
      file: '.stylelintrc.json',
    },
    {
      config: stylelintIgnoreContent,
      type: 'ignoreFile',
      file: '.stylelintignore',
    },
  ],
  prettier: [
    {
      config: prettierConfigContent,
      file: '.prettierrc.js',
    },
    {
      config: prettierIgnoreContent,
      type: 'ignoreFile',
      file: '.prettierignore',
    },
  ],
  commitlint: [
    {
      config: commitlintConfigContent,
      file: '.commitlintrc.js',
    },
    {
      config: lintstageConfigContent,
      file: '.lintstagedrc.js',
    },
    {
      config: hooksContent,
      file: '.simple-git-hooks.json',
    },
  ],
} as const
