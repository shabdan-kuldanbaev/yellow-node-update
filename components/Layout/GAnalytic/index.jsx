import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';
import ym, { YMInitializer } from 'react-yandex-metrika';

export const GAnalytic = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    ReactGA.set({ page: asPath });
    ReactGA.pageview(asPath);
    ym('hit', asPath);
  }, [asPath]);

  return <YMInitializer accounts={[process.env.YANDEX_TRACK_ID]} />;
};
