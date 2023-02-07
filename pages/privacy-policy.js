import React from 'react';
import TechnicalPageContainer from 'UI/views/TechnicalPage';
import { PAGES, ROUTES } from 'utils/constants';
import { getServicePageProps, getStaticPropsWrapper } from 'utils/dataSelectors';

const PrivacyPolicy = ({ introSection }) => (
  <TechnicalPageContainer
    introSection={introSection}
    type={PAGES.privacyPolicy}
    title={ROUTES.privacyPolicy.title}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.privacyPolicy, getServicePageProps);

export default PrivacyPolicy;
