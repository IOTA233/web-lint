module.exports = {
  // 对于 js、ts 脚本文件，应用 eslint
  '**/*.{js,jsx,tsx,ts}': [
    'eslint --ext .js,.jsx,.ts,.tsx,.vue --fix  -c lint-config/.eslintrc.js --ignore-path lint-config/.eslintignore',
  ],
  // 对于 css scss 文件，应用 stylelint
  '**/*.{scss,css}': [
    'stylelint --fix ./**/*.{css,scss,vue,html} -c lint-config/.stylelintrc.json',
  ],
  // Vue 文件由于同时包含模板、样式、脚本，因此 eslint、stylelint 都要使用
  '**/*.vue': [
    'eslint --ext .js,.jsx,.ts,.tsx,.vue --fix  -c lint-config/.eslintrc.js --ignore-path lint-config/.eslintignore',
    'stylelint --fix ./**/*.{css,scss,vue,html} -c lint-config/.stylelintrc.json',
  ],
}
