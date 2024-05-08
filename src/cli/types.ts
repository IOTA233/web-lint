export interface PromItem<T> {
  label: string
  value: T
  hint?: string
}

export type LintOption = 'eslint' | 'stylelint' | 'prettier' | 'commitlint'

export interface PromtResult {
  /**
   * 是否需要提交代码
   */
  uncommittedConfirmed: boolean
  /**
   * 需要安装的lint工具
   */
  lints: LintOption[]
  /**
   * 是否需要在 .lint 目录中管理配置文件
   */
  organizeConfigConfirmed: boolean
  /**
   * 是否需要清除旧的配置文件（organizeConfigConfirmed 为 true 时才会出现此选项）
   */
  clearCacheConfirmed: boolean
  /**
   * 是否需要使用推荐的vscode配置（organizeConfigConfirmed 为 true 时，不出现此选项，默认执行）
   */
  vscodeConfirmed: boolean
}
