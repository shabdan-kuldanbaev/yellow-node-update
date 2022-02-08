import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import CustomService from 'containers/CustomService';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';

const IOSDevelopment = ({ introSection }) => (
  <CustomService
    introSection={introSection}
    type={PAGES.developmentServices}
  />
);

IOSDevelopment.getInitialProps = async ({ store, req }) => {
  try {
    store.dispatch(fetchLayoutData({ slug: PAGES.developmentServices }));

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    return {};
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the IOSDevelopment.getInitialProps function',
    });
  }
};

export default IOSDevelopment;
