import c from 'picocolors'
import pkgJson from '../../package.json'
import type { ToolOption, PromItem } from './types'

export { pkgJson }

export const vscodeSettingsString = `
  // Enable the ESlint flat config support
  "eslint.experimental.useFlatConfig": true,

  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off" },
    { "rule": "format/*", "severity": "off" },
    { "rule": "*-indent", "severity": "off" },
    { "rule": "*-spacing", "severity": "off" },
    { "rule": "*-spaces", "severity": "off" },
    { "rule": "*-order", "severity": "off" },
    { "rule": "*-dangle", "severity": "off" },
    { "rule": "*-newline", "severity": "off" },
    { "rule": "*quotes", "severity": "off" },
    { "rule": "*semi", "severity": "off" }
  ],

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "toml",
    "astro",
  ]
`

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
