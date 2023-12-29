import { useState } from 'react';
import { rootUrl } from 'utils/helper';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { useFetchPageQuery } from 'store/apis/page';
import { PAGES } from 'utils/constants';

export const useProcess = ({ introSection, json }) => {
  const { data: { metaData } = {} } = useFetchPageQuery(PAGES.process);
  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);

  const breadcrumbs = getBreadcrumbs(PAGES.process);
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}/process`,
  };

  const openFullscreenEstimation = () => setIsFullscreenEstimation(true);
  const closeFullscreenEstimation = () => setIsFullscreenEstimation(false);

  return {
    json,
    breadcrumbs,
    pageMetadata,
    introSection,
    isFullscreenEstimation,
    openFullscreenEstimation,
    closeFullscreenEstimation,
  };
};
