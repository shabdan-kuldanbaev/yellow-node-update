import React from 'react';
import TechnicalPageContainer from 'containers/TechnicalPage';
import { PAGES, ROUTES } from 'utils/constants';
import { getServicePageProps, getStaticPropsWrapper } from 'utils/dataSelectors';

const TermsAndConditions = ({ introSection }) => (
  <TechnicalPageContainer
    introSection={introSection}
    type={PAGES.termsAndConditions}
    title={ROUTES.termsAndConditions.title}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.termsAndConditions, getServicePageProps);

export default TermsAndConditions;
