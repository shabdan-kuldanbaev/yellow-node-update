import React from 'react';
import CustomService from 'containers/CustomService';
import { getStaticPropsWrapper } from 'utils/helper';
import { PAGES } from 'utils/constants';

const IOSDevelopment = ({ introSection }) => (
  <CustomService
    introSection={introSection}
    type={PAGES.developmentServices}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.developmentServices);

export default IOSDevelopment;
