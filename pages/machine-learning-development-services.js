import React from 'react';
import CustomService from 'containers/CustomService';
import { getStaticPropsWrapper } from 'utils/helper';
import { PAGES } from 'utils/constants';

const MLDevelopment = ({ introSection }) => (
  <CustomService
    introSection={introSection}
    type={PAGES.mlDevelopment}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.mlDevelopment);

export default MLDevelopment;
