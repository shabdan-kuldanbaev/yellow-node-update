import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import CustomMobileAppContainer from 'containers/CustomMobileAppDevelopment';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';

const CustomMobileApp = () => <CustomMobileAppContainer />;

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
