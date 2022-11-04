import Button from '.';

export default {
  title: 'Design system/Components/Button',
  component: Button,
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
  backgrounds: {
    default: 'dark',
  },
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
