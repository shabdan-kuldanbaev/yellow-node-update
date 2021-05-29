import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import { ProcessContainer } from 'containers';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';

const Process = ({ introSection }) => <ProcessContainer introSection={introSection} />;

Process.getInitialProps = async ({ store, req }) => {
  try {
    store.dispatch(fetchLayoutData({ slug: PAGES.process }));

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    return {};
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the Process.getInitialProps function',
    });
  }
};

export default Process;
