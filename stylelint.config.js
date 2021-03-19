module.exports = {
  extends: [
    'stylelint-config-standard',
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
        ],
      },
    ],
    'property-case': null,
    'color-hex-case': null,
  },
};
