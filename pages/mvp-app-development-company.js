import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import CustomService from 'containers/CustomService';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';

const MvpDevelopment = ({ introSection }) => (
  <CustomService
    introSection={introSection}
    type={PAGES.mvpDevelopment}
  />
);

MvpDevelopment.getInitialProps = async ({ store, req }) => {
  try {
    store.dispatch(fetchLayoutData({ slug: PAGES.mvpDevelopment }));

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    return {};
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the MvpDevelopment.getInitialProps function',
    });
  }
};

export default MvpDevelopment;
