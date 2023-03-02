import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { ThemeProvider } from '@material-ui/core';
import smoothscroll from 'smoothscroll-polyfill';
import { wrapper } from 'redux/store';
import Layout from 'UI/containers/Layout';
import { loadDuck } from 'UI/components/Duck/DuckWrapper/utils/helpers';
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
    (async () => {
      const duck = await loadDuck();

      setContextData((prev) => ({ ...prev, duck }));
    })();
  }, []);

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
