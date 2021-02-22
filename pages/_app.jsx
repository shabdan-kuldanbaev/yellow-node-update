import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import ReactGA from 'react-ga';
import withReduxSaga from 'next-redux-saga';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { ParallaxProvider } from 'react-scroll-parallax';
import Router from 'next/router';
import configureStore from 'redux/store';
import { Layout } from 'containers';
import 'animate.css/animate.min.css';
import 'styles/index.scss';
import { customTheme } from 'styles/muiTheme';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const App = ({
  Component,
  pageProps,
  store,
}) => {
  const [theme, setTheme] = useState('dark');
  const introSection = useRef(null);
  const [isPageLoaded, setPageLoad] = useState(true);
  const themeMui = createMuiTheme(customTheme);

  useEffect(() => {
    ReactGA.initialize(process.env.GOOGLE_TRACK_ID);
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
    <Provider store={store}>
      <ThemeProvider theme={themeMui}>
        <ParallaxProvider>
          <Layout
            isLoading={isPageLoaded}
            theme={theme}
            introSection={introSection}
          >
            <Component
              theme={theme}
              introSection={introSection}
              {...pageProps}
            />
          </Layout>
        </ParallaxProvider>
      </ThemeProvider>
    </Provider>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  Component.getInitialProps && (pageProps = await Component.getInitialProps({ ctx }));
  return { pageProps };
};

export default withRedux(configureStore)(withReduxSaga(App));
