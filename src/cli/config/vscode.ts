export const vscodeContent = `{
  "typescript.tsdk": "node_modules/typescript/lib",

  // 关闭 IDE 自带的样式验证
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  // 指定 stylelint 生效的文件类型(尤其是 vue 文件)。
  "stylelint.validate": ["css", "scss", "postcss", "vue"],

  // 启用 eslint 的格式化能力
  "eslint.format.enable": true,
  // eslint 会在检查出错误时，给出对应的文档链接地址
  "eslint.codeAction.showDocumentation": {
    "enable": true
  },
  // 指定 eslint 生效的文件类型(尤其是 vue 文件)。
  "eslint.probe": ["javascript", "typescript", "vue"],
  // 指定 eslint 的工作区，使每个子模块下的 .eslintignore 文件都能对当前目录生效。
  "eslint.workingDirectories": [{ "mode": "auto" }],

  // 设置默认格式化工具为 Prettier
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  // 默认禁用自动格式化(手动格式化快捷键：Shift + Alt + F)
  "editor.formatOnSave": false,
  "editor.formatOnPaste": false,

  // 启用自动代码修复功能，保存时触发 eslint 和 stylelint 的自动修复。
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit"
  },

  // volar 可以处理 vue 文件的格式化
  "[vue]": {
    "editor.defaultFormatter": "Vue.volar"
  },

  // json、yaml 等配置文件保存时自动格式化
  "[json]": {
    "editor.formatOnSave": true
  },
  "[jsonc]": {
    "editor.formatOnSave": true
  },
  "[yaml]": {
    "editor.formatOnSave": true
  },

  // 行尾默认为 LF 换行符而非 CRLF
  "files.eol": "\n",

  // 键入 Tab 时插入空格而非 \t
  "editor.insertSpaces": true,

  // 缩进大小：2
  "editor.tabSize": 2,

  // 自动补充闭合的 HTML 标签
  "html.autoClosingTags": true
}

`
