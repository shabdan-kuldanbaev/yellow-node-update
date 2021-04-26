import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import Home from 'containers/Home';
import { PAGES } from 'utils/constants';

const Homepage = ({ theme, introSection }) => <Home theme={theme} introSection={introSection} />;

Homepage.getInitialProps = async ({ store, req }) => {
  store.dispatch(fetchLayoutData({ slug: PAGES.homepage }));

  if (req) {
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }

  return {};
};

export default Homepage;
