import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import CustomChatAppContainer from 'containers/CustomChatAppDevelopment';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';

const CustomChatApp = () => <CustomChatAppContainer />;

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
