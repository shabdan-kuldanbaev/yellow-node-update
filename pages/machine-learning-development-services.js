import React from 'react';
import CustomService from 'containers/CustomService';
import { getServicePageProps, getStaticPropsWrapper } from 'utils/dataSelectors';
import { PAGES } from 'utils/constants';

const MLDevelopment = (pageProps) => (
  <CustomService
    type={PAGES.mlDevelopment}
    {...pageProps}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.mlDevelopment, getServicePageProps);

export default MLDevelopment;
