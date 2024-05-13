export function hooksConfig(dir: string) {
  return `{
    "pre-commit": "npx lint-staged -c ${dir}.lintstagedrc.js",
    "commit-msg": "npx commitlint -g ${dir}.commitlintrc.js -e"
  }
  `
}
