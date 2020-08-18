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
    'prettier/prettier': [
      'off',
      {
        bracketSpacing: true,
        jsxBracketSameLine: false,
        printWidth: 80,
        semi: true,
        singleQuote: false,
        tabWidth: 2,
        trailingComma: 'none',
        useTabs: false,
      },
    ],
    camelcase: ['off'],
    eqeqeq: ['off'],
    quotes: [1, 'double'],
    'linebreak-style': [2, 'unix'],
    'jsx-a11y/href-no-hash': 'off',
  },
};
