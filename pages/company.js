import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import { CompanyContainer } from 'containers';
import { PAGES } from 'utils/constants';

const Company = () => <CompanyContainer />;

Company.getInitialProps = async ({ store, req }) => {
  store.dispatch(fetchLayoutData({ slug: PAGES.company }));

  if (req) {
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }

  return {};
};

export default Company;
