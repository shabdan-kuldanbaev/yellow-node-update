import TextField from './index';

export default {
  title: 'Design system/Components/TextField',
  component: TextField,
};

const Template = (args) => <TextField {...args} />;

export const Normal = Template.bind({});
export const Error = Template.bind({});

Normal.args = {
  placeholder: 'Name',
};

Error.args = {
  type: 'email',
  value: 'test',
};
