import React from 'react';
import PortfolioContainer from 'containers/Portfolio';
import { PAGES } from 'utils/constants';
import { getPortfolioPageProps, getStaticPropsWrapper } from 'utils/dataSelectors';

const Portfolio = (pageData) => <PortfolioContainer {...pageData} />;

export const getStaticProps = getStaticPropsWrapper(PAGES.portfolio, getPortfolioPageProps);

export default Portfolio;
