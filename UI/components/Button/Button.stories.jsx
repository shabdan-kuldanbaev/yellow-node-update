import Button from '.';

export default {
  title: 'Design system/Components/Button',
  component: Button,
};

const Template = (args) => <Button {...args}>Button</Button>;

export const Default = Template.bind({});
Default.parameters = {
  backgrounds: {
    default: 'white',
  },
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
    default: 'dark gray',
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
  backgrounds: {
    default: 'gray',
  },
  controls: {
    exclude: ['disabled'],
  },
};
