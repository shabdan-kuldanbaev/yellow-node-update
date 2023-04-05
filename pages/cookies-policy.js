import TechnicalPageContainer from 'UI/views/TechnicalPage';
import { PAGES, ROUTES } from 'utils/constants';
import { getStaticPropsWrapper } from 'utils/dataSelectors';

const CookiesPolicy = ({ introSection }) => (
  <TechnicalPageContainer
    introSection={introSection}
    type={PAGES.cookiesPolicy}
    title={ROUTES.cookiesPolicy.title}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.cookiesPolicy);

export default CookiesPolicy;
