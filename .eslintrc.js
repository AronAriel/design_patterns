module.exports = {
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
    mocha: true,
  },
  rules: {
    'no-console': 'off',
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
  },
};
