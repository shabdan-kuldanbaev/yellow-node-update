'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useParams, usePathname } from 'next/navigation';
import { getCookie, setCookie } from 'cookies-next';
import smoothscroll from 'smoothscroll-polyfill';
import { getUserLocation } from 'utils/helper';
import { leadSourceCookieName, userLocation } from 'utils/constants/cookieNames';
import getGaMetrics from 'utils/gaMetrics/getGaMetrics';

export default function useApp() {
  const pathname = usePathname();
  const { slug } = useParams();

  const [contextData, setContextData] = useState({
    isHomepageVisit: false,
    isFirstHomepageVisit: false,
    duck: null,
  });

  const [pageClusters, setPageClusters] = useState([]);

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

    const trafficData = getGaMetrics({ path: pathname.slice(1) });

    setCookie(leadSourceCookieName, JSON.stringify(trafficData));
  }, [pathname]);

  const AppContextValue = useMemo(() => ({
    contextData,
    setContextData,
  }), [contextData, setContextData]);

  const PageClustersContextValue = useMemo(() => ({
    pageClusters,
    setPageClusters,
  }), [pageClusters, setPageClusters]);

  return {
    introSection,
    AppContextValue,
    PageClustersContextValue,
    slug,
    pathname,
  };
}
