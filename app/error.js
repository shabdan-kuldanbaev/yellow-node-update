'use client';

import PageNotFound from 'containers/PageNotFound';
import { PAGES } from 'utils/constants';
import { handleError } from 'utils/error';
import { getPage } from 'utils/dataFetching/getPage';

const Error = ({ statusCode, err }) => (statusCode
  ? statusCode === 404 && <PageNotFound />
  : `An error occurred on client ${err}`
);

Error.getInitialProps = async ({
  err,
  res,
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
    await getPage(PAGES.notFound);
  }

  if (err) {
    handleError({
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
