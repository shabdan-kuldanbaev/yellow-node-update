import React from 'react';
import CustomServices from 'containers/CustomService';
import { getStaticPropsWrapper } from 'utils/helper';
import { PAGES } from 'utils/constants';

const CustomWebApp = ({ introSection }) => (
  <CustomServices
    introSection={introSection}
    type={PAGES.customWebApp}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.customWebApp);

export default CustomWebApp;
