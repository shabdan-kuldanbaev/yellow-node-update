module.exports = {
  extends: [
    'stylelint-config-standard',
    'postcss-scss',
  ],
  customSyntax: 'postcss-scss',
  ignoreFiles: [
    '/build',
    '/node_modules',
    '/public',
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'selector-combinator-space-after': 'always',
    'no-descending-specificity': null,
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
    linebreaks: 'unix',
    'function-url-quotes': null,
    'function-no-unknown': null,
    'alpha-value-notation': 'number',
    'string-quotes': 'single',
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
        ],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreSelectors: [
          ':export',
          /^:import/,
        ],
      },
    ],
    'function-name-case': [
      'lower',
      {
        ignoreFunctions: [
          'calcRem',
        ],
      },
    ],
    'property-case': null,
    'color-hex-case': null,
  },
};
