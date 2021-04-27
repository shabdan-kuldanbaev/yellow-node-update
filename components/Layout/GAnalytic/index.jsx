import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { gaSend } from 'utils/helper';

export const GAnalytic = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    gaSend('pageview', asPath);
  }, [asPath]);

  return null;
};
