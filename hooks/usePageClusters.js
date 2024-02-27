import { useContext } from 'react';
import { PageClustersContext } from 'utils/appContext';

export default async function usePageClusters() {
  const { pageClusters } = useContext(PageClustersContext);

  return pageClusters;
}
