import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import withReduxSaga from 'next-redux-saga';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import configureStore from 'redux/store';

const App = ({
  Component,
  pageProps,
  store,
}) => (
  <Fragment>
    <Head>
      <title>Yellow</title>
      <link rel="shortcut icon" href="https://media-exp1.licdn.com/dms/image/C4E0BAQFQR1Bi4npy3w/company-logo_200_200/0?e=1593648000&v=beta&t=G1nk-pWIHcDv9jH87ntcvgl5Ri_exz7rryrdykN6DOw" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
    </Head>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </Fragment>
);

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  Component.getInitialProps && (pageProps = await Component.getInitialProps({ ctx }));
  return { pageProps };
};

export default withRedux(configureStore)(withReduxSaga(App));
