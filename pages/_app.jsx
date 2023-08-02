import {
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { ThemeProvider } from '@material-ui/core';
import smoothscroll from 'smoothscroll-polyfill';
import { wrapper } from 'redux/store';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'redux/apis/dataSending';
import Layout from 'UI/containers/Layout';
import { AppContext } from 'utils/appContext';
import { getDataFromLocalStorageWithExpire } from 'utils/helper';
import { customTheme } from 'styles/muiTheme';
import 'animate.css/animate.min.css';
import 'swiper/css/bundle';
import 'swiper/scss/scrollbar';
import 'swiper/scss/pagination';
import 'styles/index.scss';

function App({ Component, pageProps }) {
  const [subscribe] = useSubscribeMutation({ fixedCacheKey: SUBSCRIPTION_CASH_KEY });

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
  }, []);

  useEffect(() => {
    subscribe({ savedSubscriptionEmail: getDataFromLocalStorageWithExpire('subscriptionEmail') });
  }, [subscribe]);

  const AppContextValue = useMemo(() => ({
    contextData,
    setContextData,
  }), [contextData, setContextData]);

  return (
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
  );
}

export default wrapper.withRedux(App);
