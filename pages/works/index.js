import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import { PortfolioContainer } from 'containers';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';

const Portfolio = ({ introSection }) => <PortfolioContainer introSection={introSection} />;

Portfolio.getInitialProps = async ({ store, req }) => {
  try {
    store.dispatch(fetchLayoutData({ slug: PAGES.portfolio }));

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    return {};
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the Portfolio.getInitialProps function',
    });
  }
};

export default Portfolio;
