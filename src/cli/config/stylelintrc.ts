export const stylelintConfigContent = `
{
  "extends": [
    "@stylistic/stylelint-plugin",
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-vue/scss",
    "stylelint-config-recess-order"
  ],
  "rules": {
    "selector-class-pattern": null
  }
}
`
export const stylelintIgnoreContent = `
node_modules
dist
 `
