import TechnicalPageContainer from 'UI/views/TechnicalPage';
import { PAGES, ROUTES } from 'utils/constants';
import { getStaticPropsWrapper } from 'utils/dataSelectors';

const PrivacyPolicy = ({ introSection }) => (
  <TechnicalPageContainer
    introSection={introSection}
    type={PAGES.privacyPolicy}
    title={ROUTES.privacyPolicy.title}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.privacyPolicy);

export default PrivacyPolicy;
