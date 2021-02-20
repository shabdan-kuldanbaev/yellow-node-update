import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import { ProcessContainer } from 'containers';
import { PAGES } from 'utils/constants';

const Process = () => (
  <ProcessContainer />
);

Process.getInitialProps = async ({ store, req }) => {
  store.dispatch(fetchLayoutData({ slug: PAGES.process }));

  if (req) {
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }

  return {};
};

export default Process;
