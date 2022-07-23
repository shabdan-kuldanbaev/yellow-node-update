import React from 'react';
import CustomService from 'containers/CustomService';
import { getServicePageProps, getStaticPropsWrapper } from 'utils/dataSelectors';
import { PAGES } from 'utils/constants';

const CloudAppDevelopment = (pageProps) => (
  <CustomService
    type={PAGES.cloudDevelopment}
    {...pageProps}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.cloudDevelopment, getServicePageProps);

export default CloudAppDevelopment;
