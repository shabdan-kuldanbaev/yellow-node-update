import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import DesignServicesContainer from 'containers/DesignServices';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';

const DesignServices = () => <DesignServicesContainer />;

DesignServices.getInitialProps = async ({ store, req }) => {
  try {
    store.dispatch(fetchLayoutData({ slug: PAGES.designServices }));

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    return {};
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the DesignServices.getInitialProps function',
    });
  }
};

export default DesignServices;
