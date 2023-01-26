module.exports = {
  env: {
    node: true,
    es2021: true
  },
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/eslint-config-typescript',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint'],
  rules: {}
}
