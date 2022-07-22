import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { wrapper } from 'redux/store';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core';
import smoothscroll from 'smoothscroll-polyfill';
import { setPageReadyToDisplay } from 'redux/actions/layout';
import Layout from 'containers/Layout';
import { AppContext } from 'utils/appContext';
import { customTheme } from 'styles/muiTheme';
import 'animate.css/animate.min.css';
import 'swiper/css/bundle';
import 'swiper/scss/scrollbar';
import 'swiper/scss/pagination';
import 'styles/index.scss';

function App({ Component, pageProps }) {
  const [contextData, setContextData] = useState({
    isHomepageVisit: false,
    isFirstHomepageVisit: false,
  });
  const [theme] = useState('dark');
  const introSection = useRef(null);
  const dispatch = useDispatch();

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

    smoothscroll.polyfill();
  }, []);

  const AppContextValue = useMemo(() => ({
    contextData,
    setContextData,
  }), [contextData, setContextData]);

  return (
    <>
      <Head>
        <meta
          name="robots"
          content="none"
        />
      </Head>
      <AppContext.Provider value={AppContextValue}>
        <ThemeProvider theme={customTheme}>
          <Layout introSection={introSection}>
            <Component
              theme={theme}
              introSection={introSection}
              {...pageProps}
            />
          </Layout>
        </ThemeProvider>
      </AppContext.Provider>
    </>
  );
}

export default wrapper.withRedux(App);
