import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';
import CustomService from 'containers/CustomService';

const AndroidDevelopment = ({ introSection }) => <CustomService introSection={introSection} />;

AndroidDevelopment.getInitialProps = async ({ store, req }) => {
  try {
    store.dispatch(fetchLayoutData({ slug: PAGES.androidDevelopmentServices }));

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    return {};
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the AndroidDevelopment.getInitialProps function',
    });
  }
};

export default AndroidDevelopment;
