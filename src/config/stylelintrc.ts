export const getStylelintConfig = () => `
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
