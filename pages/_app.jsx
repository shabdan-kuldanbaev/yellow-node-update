import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import ReactGA from 'react-ga';
import { wrapper } from 'redux/store';
import { ParallaxProvider } from 'react-scroll-parallax';
import Router from 'next/router';
import { Layout } from 'containers';
import 'animate.css/animate.min.css';
import 'styles/index.scss';

const App = ({ Component, pageProps }) => {
  const [theme, setTheme] = useState('dark');
  const introSection = useRef(null);
  const [isPageLoaded, setPageLoad] = useState(true);

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
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  return { pageProps };
};

export default wrapper.withRedux(App);
