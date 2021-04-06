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
          'if',
        ],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          'global',
          'export',
          'import',
          'local',
        ],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes', 'compose-with'],
        ignoreSelectors: [':export', /^:import/],
      },
    ],
    'function-name-case': [
      'lower',
      {
        ignoreFunctions: ['calcRem'],
      },
    ],
    'function-calc-no-invalid': null,
    'property-case': null,
    'color-hex-case': null,
  },
};
