import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import CustomService from 'containers/CustomService';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';

const MLDevelopment = ({ introSection }) => (
  <CustomService
    introSection={introSection}
    type={PAGES.mlDevelopment}
  />
);

MLDevelopment.getInitialProps = async ({ store, req }) => {
  try {
    store.dispatch(fetchLayoutData({ slug: PAGES.mlDevelopment }));

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    return {};
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the MLDevelopment.getInitialProps function',
    });
  }
};

export default MLDevelopment;
