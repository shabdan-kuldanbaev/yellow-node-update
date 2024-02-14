import { useState } from 'react';
import { rootUrl } from 'utils/helper';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { getPage } from 'utils/dataFetching/getPage';
import { PAGES } from 'utils/constants';
import { processes } from 'utils/processes';

export const useProcess = async () => {
  const { data: { metaData } = {} } = await getPage(PAGES.process);
  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);

  const breadcrumbs = getBreadcrumbs(PAGES.process);
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}/process`,
  };

  const openFullscreenEstimation = () => setIsFullscreenEstimation(true);
  const closeFullscreenEstimation = () => setIsFullscreenEstimation(false);

  return {
    json: processes,
    breadcrumbs,
    pageMetadata,
    isFullscreenEstimation,
    openFullscreenEstimation,
    closeFullscreenEstimation,
  };
};
