import { ToolOption } from '../types'

export function dependenceConfig(tool: ToolOption) {
  const map = {
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
  }
  return map[tool]
}
