import {
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { ThemeProvider } from '@material-ui/core';
import smoothscroll from 'smoothscroll-polyfill';
import { setCookie } from 'cookies-next';
import { wrapper } from 'redux/store';
import Layout from 'UI/containers/Layout';
import { AppContext, PageFetchContext } from 'utils/appContext';
import { customTheme } from 'styles/muiTheme';
import 'animate.css/animate.min.css';
import 'swiper/css/bundle';
import 'swiper/scss/scrollbar';
import 'swiper/scss/pagination';
import 'styles/index.scss';
import { leadSourceCookieName } from 'utils/constants/leadSourceCookieName';
import getGaMetrics from 'utils/gaMetrics/getGaMetrics';
import { CUSTOM_DOMAIN } from 'utils/constants';

function App({ Component, pageProps }) {
  const [contextData, setContextData] = useState({
    isHomepageVisit: false,
    isFirstHomepageVisit: false,
    duck: null,
  });

  const [theme] = useState('dark');
  const introSection = useRef(null);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    smoothscroll.polyfill();

    const leadSource = getGaMetrics();

    if (leadSource.source !== CUSTOM_DOMAIN) {
      setCookie(leadSourceCookieName, JSON.stringify(getGaMetrics()));
    }
  }, []);

  const AppContextValue = useMemo(() => ({
    contextData,
    setContextData,
  }), [contextData, setContextData]);

  const PageFetchContextValue = useMemo(() => ({
    pageFetchQuery: pageProps.pageFetchQuery,
  }), [pageProps.pageFetchQuery]);

  return (
    <AppContext.Provider value={AppContextValue}>
      <PageFetchContext.Provider value={PageFetchContextValue}>
        <ThemeProvider theme={customTheme}>
          <Layout introSection={introSection}>
            <Component
              theme={theme}
              introSection={introSection}
              {...pageProps}
            />
          </Layout>
        </ThemeProvider>
      </PageFetchContext.Provider>
    </AppContext.Provider>
  );
}

export default wrapper.withRedux(App);
