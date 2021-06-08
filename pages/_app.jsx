import React, {
  useState,
  useRef,
  useEffect,
  Fragment,
} from 'react';
import { wrapper } from 'redux/store';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';
import * as Sentry from '@sentry/browser';
import { ThemeProvider } from '@material-ui/core';
import { setPageReadyToDisplay } from 'redux/actions/layout';
import Layout from 'containers/Layout';
import { isServer } from 'utils/helper';
import { AppContext } from 'utils/appContext';
import errorHelper from 'utils/error';
import { customTheme } from 'styles/muiTheme';
import 'animate.css/animate.min.css';
import 'swiper/swiper-bundle.min.css';
import 'styles/index.scss';

const App = ({ Component, pageProps }) => {
  const [contextData, setContextData] = useState({
    isHomepageVisit: false,
    isFirstHomepageVisit: false,
  });
  const [theme] = useState('dark');
  const introSection = useRef(null);
  const dispatch = useDispatch();
  const isCustomDomain = pageProps.hostname.includes(process.env.CUSTOM_DOMAIN);

  useEffect(() => {
    const handleRouteChangeComplete = () => dispatch(setPageReadyToDisplay(false));

    Router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [dispatch]);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    Sentry.init({ dsn: process.env.SENTRY_DNS });
  }, []);

  return (
    <Fragment>
      <Head>
        {!isCustomDomain && (
          <meta
            name="robots"
            content="none"
          />
        )}
      </Head>
      <AppContext.Provider value={{ contextData, setContextData }}>
        <ThemeProvider theme={customTheme}>
          <Layout
            theme={theme}
            introSection={introSection}
          >
            <Component
              theme={theme}
              introSection={introSection}
              {...pageProps}
            />
          </Layout>
        </ThemeProvider>
      </AppContext.Provider>
    </Fragment>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  try {
    const hostname = isServer
      ? ctx.req.hostname
      : window.location.hostname;

    return {
      pageProps: {
        hostname,
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}
        ),
      },
    };
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the App.getInitialProps function',
    });
  }
};

export default wrapper.withRedux(App);
