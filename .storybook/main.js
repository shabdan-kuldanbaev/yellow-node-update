
module.exports = {
  "stories": [
    "../UI/**/*.stories.mdx",
    "../UI/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    // "storybook-addon-next",
    '@storybook/preset-scss',
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  refs: {
    'design-system': {
      title: "Storybook Design System",
      url: "https://5ccbc373887ca40020446347-yldsqjoxzb.chromatic.com",
      expanded: false // optional, true by default
    }
   }
}