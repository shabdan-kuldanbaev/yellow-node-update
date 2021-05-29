import React, { Fragment } from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import { PageNotFound } from 'containers';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';

const Error = ({ statusCode, err }) => (
  <Fragment>
    {statusCode
      ? statusCode === 404 && <PageNotFound />
      : `An error occurred on client ${err}`}
  </Fragment>
);

Error.getInitialProps = async ({
  err,
  res,
  store,
  req,
  asPath,
}) => {
  let statusCode = 404;

  if (res) {
    statusCode = res.statusCode;
  } else if (err) {
    statusCode = err.statusCode;
  }

  if (statusCode === 404) {
    store.dispatch(fetchLayoutData({ slug: PAGES.notFound }));
    errorHelper.handleMessage({
      message: `404 - This page could not be found (${asPath})`,
    });

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
  }

  if (err) {
    errorHelper.handleError({
      error: err,
      message: 'Error in common (_error.jsx)',
    });
  }

  return {
    statusCode,
    err,
  };
};

export default Error;
