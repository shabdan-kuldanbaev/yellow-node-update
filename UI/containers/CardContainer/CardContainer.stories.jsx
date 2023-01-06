import CardContainer from '.';
import Overlay from '../Overlay';
import styles from './CardContainer.module.scss';

export default {
  title: 'Design system/Containers/CardContainer',
  component: CardContainer,
};

const Template = (args) => <CardContainer {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  backgrounds: {
    default: 'light gray',
  },
};
Default.args = {
  children: 'test',
};

export const Transparent = Template.bind({});
Transparent.parameters = {
  backgrounds: {
    default: 'light gray',
  },
};
Transparent.args = {
  noBackground: true,
  children: 'test',
};

export const WithOverlay = Template.bind({});
WithOverlay.parameters = {
  backgrounds: {
    default: 'light gray',
  },
};
WithOverlay.args = {
  children: (
    <>
      <Overlay className={styles.overlay}>Test</Overlay>
      Test
    </>
  ),
  className: styles.sb_cardWithOverlay,
};
