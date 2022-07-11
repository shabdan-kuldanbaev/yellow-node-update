import React from 'react';
import CustomService from 'containers/CustomService';
import { getStaticPropsWrapper } from 'utils/helper';
import { PAGES } from 'utils/constants';

const MvpDevelopment = ({ introSection }) => (
  <CustomService
    introSection={introSection}
    type={PAGES.mvpDevelopment}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.mvpDevelopment);

export default MvpDevelopment;
