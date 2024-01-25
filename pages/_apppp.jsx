import {
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@mui/material';
import smoothscroll from 'smoothscroll-polyfill';
import { wrapper } from 'redux/store';
import { getCookie, setCookie } from 'cookies-next';
import Layout from 'UI/containers/Layout';
import { AppContext, PageFetchContext } from 'utils/appContext';
import { getUserLocation } from 'utils/helper';
import { customTheme } from 'styles/muiTheme';
import { leadSourceCookieName, userLocation } from 'utils/constants/cookieNames';
import getGaMetrics from 'utils/gaMetrics/getGaMetrics';
import 'animate.css/animate.min.css';
import 'swiper/css/bundle';
import 'swiper/scss/scrollbar';
import 'swiper/scss/pagination';
import 'styles/index.scss';

function App({ Component, pageProps }) {
  const router = useRouter();

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

    (async () => {
      const location = await getUserLocation();
      setCookie(userLocation, JSON.stringify(location));
    })();
  }, []);

  useEffect(() => {
    const savedTrafficData = getCookie(leadSourceCookieName);

    if (savedTrafficData) {
      return;
    }

    const trafficData = getGaMetrics({ path: router.asPath.slice(1) });

    setCookie(leadSourceCookieName, JSON.stringify(trafficData));
  }, [router]);

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
