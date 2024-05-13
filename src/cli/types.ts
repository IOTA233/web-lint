export interface PromItem<T> {
  label: string
  value: T
  hint?: string
}

export type ToolOption = 'eslint' | 'stylelint' | 'prettier' | 'commitlint'

export interface PromtResult {
  /**
   * 是否需要提交代码
   */
  uncommittedConfirmed: boolean
  /**
   * 需要安装的lint工具
   */
  tools: ToolOption[]
  /**
   * 是否需要在固定目录中管理配置文件
   */
  configDirConfirmed: string
  /**
   * 在固定目录中管理配置文件
   */
  configDir: string
  /**
   * 是否需要清除旧的配置文件（organizeConfigDir 为 true 时才会出现此选项）
   */
  clearCacheConfirmed: boolean
  /**
   * 是否需要使用推荐的vscode配置（organizeConfigDir 为 true 时，不出现此选项，默认执行）
   */
  vscodeConfirmed: boolean
}
