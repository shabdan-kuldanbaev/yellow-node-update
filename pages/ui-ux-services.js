import React from 'react';
import CustomServices from 'containers/CustomService';
import { getServicePageProps, getStaticPropsWrapper } from 'utils/dataSelectors';
import { PAGES } from 'utils/constants';

const DesignServices = (pageData) => (
  <CustomServices
    type={PAGES.designServices}
    {...pageData}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.designServices, getServicePageProps);

export default DesignServices;
