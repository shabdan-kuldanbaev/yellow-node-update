import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import CustomService from 'containers/CustomService';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';

const CustomChatApp = () => <CustomService type={PAGES.customChatApp} />;

CustomChatApp.getInitialProps = async ({ store, req }) => {
  try {
    store.dispatch(fetchLayoutData({ slug: PAGES.customChatApp }));

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    return {};
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the CustomChatApp.getInitialProps function',
    });
  }
};

export default CustomChatApp;
