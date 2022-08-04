import React from 'react';
import CustomService from 'containers/CustomService';
import { getServicePageProps, getStaticPropsWrapper } from 'utils/dataSelectors';
import { PAGES } from 'utils/constants';

const MvpDevelopment = (pageProps) => (
  <CustomService
    type={PAGES.mvpDevelopment}
    {...pageProps}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.mvpDevelopment, getServicePageProps);

export default MvpDevelopment;
