module.exports = {
  env: {
    node: true,
    es2021: true
  },
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['.eslintrc.js'],
  plugins: ['@typescript-eslint'],
  rules: {}
}