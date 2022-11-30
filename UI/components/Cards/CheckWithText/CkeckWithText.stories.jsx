import CheckWithText from '.';

export default {
  title: 'Design system/Components/CheckWithText',
  component: CheckWithText,
};

const Template = (args) => <CheckWithText {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  backgrounds: {
    default: 'light gray',
  },
};
Default.args = {
  children: 'test',
};
