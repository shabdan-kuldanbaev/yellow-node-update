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
import { AppContext } from 'utils/appContext';
import { customTheme } from 'styles/muiTheme';
import 'animate.css/animate.min.css';
import 'styles/index.scss';

const App = ({ Component, pageProps }) => {
  const [contextData, setContextData] = useState({
    isHomepageVisit: false,
    isFirstHomepageVisit: false,
  });
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
  }, [dispatch]);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <AppContext.Provider value={{ contextData, setContextData }}>
      <ThemeProvider theme={customTheme}>
        <Layout theme={theme} introSection={introSection}>
          <Component
            theme={theme}
            introSection={introSection}
            {...pageProps}
          />
        </Layout>
      </ThemeProvider>
    </AppContext.Provider>
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
