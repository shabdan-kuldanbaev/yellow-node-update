import React, { Fragment } from 'react';
import Head from 'next/head';


const Error = ({ statusCode }) => (
  statusCode
    ? statusCode === 404 && (
      <Fragment>
        <Head>
          <title>404 - Yellow</title>
          <meta name="description" content="Whoops! Looks like something is wrong. The page you were looking for doesnt exist" />
        </Head>
        <div
          style={{
            height: '65vh',
            paddingTop: '300px',
            textAlign: 'center',
            backgroundColor: 'white',
          }}
        >
          404
        </div>
      </Fragment>
    )
    : 'An error occurred on client'
);

Error.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
