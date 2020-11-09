module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:prettier/recommended'],
  plugins: ['import', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['error'],

    // EsLint Rules
    'linebreak-style': ['error', 'unix'],
    'prefer-const': 'error',
    'no-var': 'error',
    'no-console': 'off',
    'no-prototype-builtins': 'off',
    'prefer-promise-reject-errors': 'off',
    camelcase: ['error', { properties: 'always' }],

    // import Rules
    'import/first': 'error',
    'import/exports-last': 'error',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        // 'newlines-between': 'always',
      },
    ],
    'import/newline-after-import': 'error',
  },

  settings: {
    'import/resolver': {
      webpack: 'webpack.config.js',
    },
  },
};
