module.exports = {
  extends: [
    'stylelint-config-standard',
  ],
  ignoreFiles: [
    '/build',
    '/node_modules',
    '/oldData',
    '/public',
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'include',
          'mixin',
          'extend',
          'global',
          'for',
          'function',
          'return',
          'calcRem',
          'export',
          'import',
        ],
      },
    ],
    'property-case': null,
    'color-hex-case': null,
  },
};
