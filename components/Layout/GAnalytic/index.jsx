import { useEffect } from 'react';
import { useRouter } from 'next/router';
import gaHelper from 'utils/ga';

const GAnalytic = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    gaHelper.pageview(asPath);
  }, [asPath]);

  return null;
};

export default GAnalytic;
