import Button from '.';

export default {
  title: 'Design system/Components/Button',
  component: Button,
  parameters: {
    backgrounds: {
      default: 'twitter',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#171717' },
        { name: 'darkBlue', value: '#002880' },
      ],
    },
  },
};

const Template = (args) => <Button {...args}>Button</Button>;

export const Default = Template.bind({});
Default.parameters = {
  controls: {
    exclude: ['dark'],
  },
};

export const Dark = Template.bind({});
Dark.args = {
  dark: true,
};
Dark.parameters = {
  backgrounds: { default: 'dark' },
  controls: {
    exclude: ['dark'],
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
Disabled.parameters = {
  controls: {
    exclude: ['disabled'],
  },
};
