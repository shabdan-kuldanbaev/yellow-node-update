import 'styles/index.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'twitter',
    values: [
      { name: 'white', value: '#ffffff' },
      { name: 'light gray', value: '#eeeeee' },
      { name: 'gray', value: '#757575' },
      { name: 'dark gray', value: '#1f1f1f' },
      { name: 'black', value: '#000000' },
    ],
  },
}