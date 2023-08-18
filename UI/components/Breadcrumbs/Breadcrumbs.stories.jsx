import { getBreadcrumbs } from 'utils/breadcrumbs';
import { ROUTES } from 'utils/constants';
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
  breadcrumbs: getBreadcrumbs(ROUTES.aiDevelopment),
};
