import React from 'react';
import CompanyContainer from 'containers/Company';
import { getStaticPropsWrapper } from 'utils/dataSelectors';
import { PAGES } from 'utils/constants';

const Company = ({ introSection, ...rest }) => (
  <CompanyContainer
    introSection={introSection}
    {...rest}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.company);

export default Company;
