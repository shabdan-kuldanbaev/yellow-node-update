import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';
import ym, { YMInitializer } from 'react-yandex-metrika';

export const GAnalytic = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    const { pathname } = window.location;
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);
    ym('hit', pathname);
  }, [asPath]);

  return <YMInitializer accounts={[process.env.YANDEX_TRACK_ID]} />;
};
