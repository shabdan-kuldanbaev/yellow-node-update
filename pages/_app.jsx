import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import ReactGA from 'react-ga';
import { wrapper } from 'redux/store';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import { ThemeProvider } from '@material-ui/core';
import { setPageReadyToDisplay } from 'redux/actions/layout';
import { Layout } from 'containers';
import { customTheme } from 'styles/muiTheme';
import 'animate.css/animate.min.css';
import 'styles/index.scss';

const App = ({ Component, pageProps }) => {
  const [theme] = useState('dark');
  const introSection = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    ReactGA.initialize(process.env.GOOGLE_TRACK_ID);
  }, []);

  useEffect(() => {
    const handleRouteChangeComplete = () => dispatch(setPageReadyToDisplay(false));

    Router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <Layout theme={theme} introSection={introSection}>
        <Component
          theme={theme}
          introSection={introSection}
          {...pageProps}
        />
      </Layout>
    </ThemeProvider>
  );
};

App.getInitialProps = async ({ Component, ctx }) => ({
  pageProps: {
    ...(Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}
    ),
  },
});

export default wrapper.withRedux(App);
