module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    'jest/globals': true,
  },
  extends: ['standard', 'plugin:prettier/recommended'],
  plugins: ['prettier', 'jest'],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  rules: {
    'no-nested-ternary': 'error',
    camelcase: ['off'],
    eqeqeq: ['off'],
    quotes: [1, 'double'],
    'linebreak-style': [2, 'unix'],
    'jsx-a11y/href-no-hash': 'off',
  },
};
