import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import CustomServices from 'containers/CustomService';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';

const CustomWebApp = ({ introSection }) => (
  <CustomServices
    introSection={introSection}
    type={PAGES.customWebApp}
  />
);

CustomWebApp.getInitialProps = async ({ store, req }) => {
  try {
    store.dispatch(fetchLayoutData({ slug: PAGES.customWebApp }));

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    return {};
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the CustomWebApp.getInitialProps function',
    });
  }
};

export default CustomWebApp;
