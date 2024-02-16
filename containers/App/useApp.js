'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { getCookie, setCookie } from 'cookies-next';
import smoothscroll from 'smoothscroll-polyfill';
import { getUserLocation } from 'utils/helper';
import { leadSourceCookieName, userLocation } from 'utils/constants/cookieNames';
import getGaMetrics from 'utils/gaMetrics/getGaMetrics';

export default function useApp() {
  const router = useRouter();

  const [contextData, setContextData] = useState({
    isHomepageVisit: false,
    isFirstHomepageVisit: false,
    duck: null,
  });

  const [pageFetchQuery, setPageFetchQuery] = useState('');

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
    pageFetchQuery,
    setPageFetchQuery,
  }), [pageFetchQuery, setPageFetchQuery]);

  return {
    introSection,
    AppContextValue,
    PageFetchContextValue,
  };
}
