import React from 'react';
import CustomService from 'containers/CustomService';
import { getServicePageProps, getStaticPropsWrapper } from 'utils/dataSelectors';
import { PAGES } from 'utils/constants';

const AndroidDevelopment = (pageProps) => (
  <CustomService
    type={PAGES.androidDevelopmentServices}
    {...pageProps}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.androidDevelopmentServices, getServicePageProps);

export default AndroidDevelopment;
