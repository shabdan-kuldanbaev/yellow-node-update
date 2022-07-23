import React from 'react';
import CompanyContainer from 'containers/Company';
import { getStaticPropsWrapper } from 'utils/dataSelectors';
import { PAGES } from 'utils/constants';

const Company = ({ introSection }) => <CompanyContainer introSection={introSection} />;

export const getStaticProps = getStaticPropsWrapper(PAGES.company);

export default Company;
