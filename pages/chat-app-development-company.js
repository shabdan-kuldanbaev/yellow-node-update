import React from 'react';
import CustomService from 'containers/CustomService';
import { getServicePageProps, getStaticPropsWrapper } from 'utils/dataSelectors';
import { PAGES } from 'utils/constants';

const CustomChatApp = (pageProps) => (
  <CustomService
    type={PAGES.customChatApp}
    {...pageProps}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.customChatApp, getServicePageProps);

export default CustomChatApp;
