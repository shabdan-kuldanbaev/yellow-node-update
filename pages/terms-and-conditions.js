import TechnicalPageContainer from 'UI/views/TechnicalPage';
import { PAGES, ROUTES } from 'utils/constants';
import { getStaticPropsWrapper } from 'utils/dataSelectors';

const TermsAndConditions = ({ introSection }) => (
  <TechnicalPageContainer
    introSection={introSection}
    type={PAGES.termsAndConditions}
    title={ROUTES.termsAndConditions.title}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.termsAndConditions);

export default TermsAndConditions;
