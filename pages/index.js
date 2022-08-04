import React from 'react';
import Home from 'containers/Home';
import { getHomePageDataPros, getStaticPropsWrapper } from 'utils/dataSelectors';
import { PAGES } from 'utils/constants';

const Homepage = (pageData) => (
  <Home {...pageData} />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.homepage, getHomePageDataPros);

export default Homepage;
