import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const GAnalytic = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ga) {
      window.ga(() => {
        const tracker = window.ga.getAll()[0];
        tracker.send('pageview', asPath);
      });
    }
  }, [asPath]);

  return null;
};
