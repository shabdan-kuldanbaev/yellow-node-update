import Input from './index';

export default {
  title: 'Design system/Components/Input',
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const Normal = Template.bind({});
export const Error = Template.bind({});

Normal.args = {
  placeholder: 'Name',
};

Error.args = {
  type: 'email',
  value: 'test',
};
