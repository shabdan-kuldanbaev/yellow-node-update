import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import { PortfolioContainer } from 'containers';
import { PAGES } from 'utils/constants';

const Portfolio = ({ introSection }) => <PortfolioContainer introSection={introSection} />;

Portfolio.getInitialProps = async ({ store, req }) => {
  store.dispatch(fetchLayoutData({ slug: PAGES.portfolio }));

  if (req) {
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }

  return {};
};

export default Portfolio;
