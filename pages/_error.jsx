import React from 'react';
import { PAGES } from 'utils/constants';

const Error = ({ statusCode, err }) => (
  <p>
    {statusCode
      ? `An error ${statusCode} occurred on server`
      : `An error occurred on client ${err}`}
  </p>
);

Error.getInitialProps = async ({ ctx: { err, res } }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  if (statusCode === 404) {
    res.writeHead(302, {
      Location: PAGES.notFound,
      'Content-Type': 'text/html; charset=utf-8',
    });
    res.end();
    return;
  }

  return { statusCode, err };
};

export default Error;
