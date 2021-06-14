import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import CompanyContainer from 'containers/Company';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';

const Company = ({ introSection }) => <CompanyContainer introSection={introSection} />;

Company.getInitialProps = async ({ store, req }) => {
  try {
    store.dispatch(fetchLayoutData({ slug: PAGES.company }));

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    return {};
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the Company.getInitialProps function',
    });
  }
};

export default Company;
