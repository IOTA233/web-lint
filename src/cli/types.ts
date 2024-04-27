export interface PromItem<T> {
  label: string
  value: T
  hint?: string
}

export type ToolOption = 'eslint' | 'stylelint' | 'prettier' | 'commitlint'

export interface PromtResult {
  uncommittedConfirmed: boolean
  tools: ToolOption[]
  updateVscodeSettings: unknown
}
