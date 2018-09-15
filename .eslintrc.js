module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  // add your custom rules here
  rules: {
    "semi": [2, "never"],
    "no-console": "off",
    "prettier/prettier": ["error", {
      "semi": false,
      "singleQuote": true,
      "trailingComma": "none",
      "bracketSpacing": true,
      "arrowParens": "avoid",
    }]
  }
}
