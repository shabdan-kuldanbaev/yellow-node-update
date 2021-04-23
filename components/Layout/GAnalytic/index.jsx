import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';

export const GAnalytic = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    ReactGA.set({ page: asPath });
    ReactGA.pageview(asPath);
  }, [asPath]);

  return null;
};
