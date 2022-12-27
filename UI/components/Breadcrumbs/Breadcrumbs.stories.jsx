import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import Breadcrumbs from '.';

export default {
  title: 'Design system/Components/Breadcrumbs',
  component: Breadcrumbs,
};

const Template = (args) => <Breadcrumbs {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  backgrounds: {
    default: 'white',
  },
};
Default.args = {
  breadcrumbs: pagesBreadcrumbs.article('test', '/'),
};
