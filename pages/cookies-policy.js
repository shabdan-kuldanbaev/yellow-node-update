import React from 'react';
import TechnicalPageContainer from 'containers/TechnicalPage';
import { PAGES, ROUTES } from 'utils/constants';
import { getServicePageProps, getStaticPropsWrapper } from 'utils/dataSelectors';

const CookiesPolicy = ({ introSection }) => (
  <TechnicalPageContainer
    introSection={introSection}
    type={PAGES.cookiesPolicy}
    title={ROUTES.cookiesPolicy.title}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.cookiesPolicy, getServicePageProps);

export default CookiesPolicy;
