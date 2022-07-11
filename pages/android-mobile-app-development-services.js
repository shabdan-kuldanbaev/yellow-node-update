import React from 'react';
import CustomService from 'containers/CustomService';
import { getStaticPropsWrapper } from 'utils/helper';
import { PAGES } from 'utils/constants';

const AndroidDevelopment = ({ introSection }) => (
  <CustomService
    introSection={introSection}
    type={PAGES.androidDevelopmentServices}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.androidDevelopmentServices);

export default AndroidDevelopment;
