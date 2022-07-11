import React from 'react';
import CustomService from 'containers/CustomService';
import { getStaticPropsWrapper } from 'utils/helper';
import { PAGES } from 'utils/constants';

const CloudAppDevelopment = ({ introSection }) => (
  <CustomService
    introSection={introSection}
    type={PAGES.cloudDevelopment}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.cloudDevelopment);

export default CloudAppDevelopment;
