import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';
import CustomService from 'containers/CustomService';

const CustomMobileApp = () => <CustomService />;

CustomMobileApp.getInitialProps = async ({ store, req }) => {
  try {
    store.dispatch(fetchLayoutData({ slug: PAGES.customMobileApp }));

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    return {};
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the CustomMobileApp.getInitialProps function',
    });
  }
};

export default CustomMobileApp;
