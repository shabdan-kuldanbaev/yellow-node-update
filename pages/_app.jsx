import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
} from 'react';
import { Provider } from 'react-redux';
import withReduxSaga from 'next-redux-saga';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import configureStore from 'redux/store';
import { Layout } from 'containers';
import Logo from 'components/Common/Logo/images/logo.svg';
import Router from 'next/router';

import 'animate.css/animate.min.css';
import 'styles/index.scss';

const App = ({
  Component,
  pageProps,
  store,
}) => {
  const [theme, setTheme] = useState('dark');
  const introSection = useRef(null);
  const [isPageLoaded, setPageLoad] = useState(true);

  useEffect(() => {
    const handleRouteChangeStart = () => setPageLoad(false);
    const handleRouteChangeComplete = () => setPageLoad(true);

    Router.events.on('routeChangeStart', handleRouteChangeStart);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart);
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Yellow</title>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800,900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Barlow+Condensed:100,300,400,800&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href={Logo} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      </Head>
      <Provider store={store}>
        <Layout
          isLoading={isPageLoaded}
          theme={theme}
          introSection={introSection}
        >
          <Component
            {...pageProps}
            theme={theme}
            introSection={introSection}
          />
        </Layout>
      </Provider>
    </Fragment>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  Component.getInitialProps && (pageProps = await Component.getInitialProps({ ctx }));
  return { pageProps };
};

export default withRedux(configureStore)(withReduxSaga(App));
