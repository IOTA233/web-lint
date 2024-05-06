export interface PromItem<T> {
  label: string
  value: T
  hint?: string
}

export type LintOption = 'eslint' | 'stylelint' | 'prettier' | 'commitlint'

export interface PromtResult {
  uncommittedConfirmed: boolean
  lints: LintOption[]
  updateVscodeSettings: unknown
}
