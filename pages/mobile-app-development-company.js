import React from 'react';
import CustomService from 'containers/CustomService';
import { getServicePageProps, getStaticPropsWrapper } from 'utils/dataSelectors';
import { PAGES } from 'utils/constants';

const CustomMobileApp = (pageProps) => (
  <CustomService
    type={PAGES.customMobileApp}
    {...pageProps}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.customMobileApp, getServicePageProps);

export default CustomMobileApp;
