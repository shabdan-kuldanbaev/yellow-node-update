import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
} from 'react';
import ReactGA from 'react-ga';
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
    ReactGA.initialize('UA-185992498-1');
  }, []);

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
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffbf02" />
        <link rel="manifest" href="/manifest.json" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800,900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content={MAIN_DESCRIPTION} />
        <meta property="og:title" content="Yellow" />
        <meta property="og:description" content={MAIN_DESCRIPTION} />
        <meta property="og:url" content={process.env.PROD_URL} />
        <meta charset="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="referrer" content="always" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="google-site-verification" content="Ou5rI476W6QK1BYTyVkJaDjTwbCFy7jdbEO5etMIi0k" />
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
