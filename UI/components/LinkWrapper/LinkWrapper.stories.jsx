import LinkWrapper from '.';

export default {
  title: 'Design system/Components/LinkWrapper',
  component: LinkWrapper,
};

const Template = (args) => <LinkWrapper {...args}>Liiiiiiink</LinkWrapper>;

export const Default = Template.bind({});
Default.parameters = {
  backgrounds: {
    default: 'white',
  },
};
Default.args = {
  path: '/',
};
