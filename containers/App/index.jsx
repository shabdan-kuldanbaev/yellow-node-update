'use client';

import {
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { useRouter, useServerInsertedHTML } from 'next/navigation';
import { ThemeProvider } from '@mui/material';
import smoothscroll from 'smoothscroll-polyfill';
import { getCookie, setCookie } from 'cookies-next';
import Layout from 'UI/containers/Layout';
import { AppContext, PageFetchContext } from 'utils/appContext';
import { getUserLocation } from 'utils/helper';
import { customTheme } from 'styles/muiTheme';
import { leadSourceCookieName, userLocation } from 'utils/constants/cookieNames';
import getGaMetrics from 'utils/gaMetrics/getGaMetrics';

import {
  ServerStyleSheet,
  StyleSheetManager,
} from 'styled-components';
import { ReduxProvider } from 'redux/provider';

function StyledComponentsRegistry({
  children,
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(
    () => new ServerStyleSheet(),
  );

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();

    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}

const App = ({ children, params }) => {
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
    pageFetchQuery: params?.pageFetchQuery,
  }), [params?.pageFetchQuery]);

  return (
    <StyledComponentsRegistry>
      <ReduxProvider>
        <AppContext.Provider value={AppContextValue}>
          <PageFetchContext.Provider value={PageFetchContextValue}>
            <ThemeProvider theme={customTheme}>
              <Layout introSection={introSection}>
                {children}
              </Layout>
            </ThemeProvider>
          </PageFetchContext.Provider>
        </AppContext.Provider>
      </ReduxProvider>
    </StyledComponentsRegistry>
  );
};

export default App;
