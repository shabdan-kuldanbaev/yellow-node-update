import 'styles/utils/storybook-defaults.scss'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  parameters: {
    backgrounds: {
      default: 'twitter',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'lightGray', value: '#ffffff' },
        { name: 'dark', value: '#171717' },
        { name: 'darkBlue', value: '#002880' },
      ],
    },
  },
}