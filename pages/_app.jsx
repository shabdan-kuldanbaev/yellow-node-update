import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
} from 'react';
import withReduxSaga from 'next-redux-saga';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { ParallaxProvider } from 'react-scroll-parallax';
import Head from 'next/head';
import Router from 'next/router';
import configureStore from 'redux/store';
import { Layout } from 'containers';
import { MAIN_DESCRIPTION } from 'utils/constants';

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
        <link rel="shortcut icon" href="/yellow_logo.ico" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800,900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content={MAIN_DESCRIPTION} />
        <meta property="og:title" content="Yellow" />
        <meta property="og:description" content={MAIN_DESCRIPTION} />
        <meta property="og:url" content="https://yellow.systems" />
      </Head>
      <Provider store={store}>
        <ParallaxProvider>
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
        </ParallaxProvider>
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
