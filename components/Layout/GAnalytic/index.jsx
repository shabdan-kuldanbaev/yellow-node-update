import { useEffect } from 'react';
import gaHelper from 'utils/ga';
import { usePathname } from 'next/navigation';

const GAnalytic = () => {
  const asPath = usePathname();

  useEffect(() => {
    gaHelper.pageview(asPath);
  }, [asPath]);

  return null;
};

export default GAnalytic;
