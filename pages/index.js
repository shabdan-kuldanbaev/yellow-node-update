import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import Home from 'containers/Home';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';

const Homepage = ({ theme, introSection }) => (
  <Home
    theme={theme}
    introSection={introSection}
  />
);

Homepage.getInitialProps = async ({ store, req }) => {
  try {
    store.dispatch(fetchLayoutData({ slug: PAGES.homepage }));

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    return {};
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the Homepage.getInitialProps function',
    });
  }
};

export default Homepage;
