export function lintstageConfig(dir: string) {
  return `module.exports = ${getLintConfig(dir)}
`
}

function getLintConfig(dir: string) {
  return `{
    // 对于 js、ts 脚本文件，应用 eslint
    '**/*.{js,jsx,tsx,ts}': [
      'eslint --ext .js,.jsx,.ts,.tsx,.vue --fix  -c ${dir}.eslintrc.js --ignore-path ${dir}.eslintignore',
    ],
    // 对于 css scss 文件，应用 stylelint
    '**/*.{scss,css}': [
      'stylelint --fix ./**/*.{css,scss,vue,html} -c ${dir}.stylelintrc.json',
    ],
    // Vue 文件由于同时包含模板、样式、脚本，因此 eslint、stylelint 都要使用
    '**/*.vue': [
      'eslint --ext .js,.jsx,.ts,.tsx,.vue --fix  -c ${dir}.eslintrc.js --ignore-path ${dir}.eslintignore',
      'stylelint --fix ./**/*.{css,scss,vue,html} -c ${dir}.stylelintrc.json',
    ],
  }`
}
