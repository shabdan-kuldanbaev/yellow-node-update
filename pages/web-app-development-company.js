import React from 'react';
import CustomServices from 'containers/CustomService';
import { getStaticPropsWrapper } from 'utils/dataSelectors';
import { PAGES } from 'utils/constants';

const CustomWebApp = (pageProps) => (
  <CustomServices
    type={PAGES.customWebApp}
    {...pageProps}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.customWebApp);

export default CustomWebApp;
