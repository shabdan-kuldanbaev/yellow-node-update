import React from 'react';
import CustomService from 'containers/CustomService';
import { getServicePageProps, getStaticPropsWrapper } from 'utils/dataSelectors';
import { PAGES } from 'utils/constants';

const IOSDevelopment = (pageProps) => (
  <CustomService
    type={PAGES.developmentServices}
    {...pageProps}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.developmentServices, getServicePageProps);

export default IOSDevelopment;
