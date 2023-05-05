import WhyUsContainer from 'UI/views/WhyUs';
import { getStaticPropsWrapper } from 'utils/dataSelectors';
import { PAGES } from 'utils/constants';

const WhyUs = ({ introSection, ...rest }) => (
  <WhyUsContainer
    introSection={introSection}
    {...rest}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.whyUs);

export default WhyUs;
