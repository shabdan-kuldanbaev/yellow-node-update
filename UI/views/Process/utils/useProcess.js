import { useState } from 'react';
import { rootUrl } from 'utils/helper';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import { useFetchPageQuery } from 'redux/apis/page';
import { PAGES } from 'utils/constants';

export const useProcess = ({ introSection, json }) => {
  const { data: { metaData } = {} } = useFetchPageQuery(PAGES.process);
  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);

  const breadcrumbs = pagesBreadcrumbs.process();
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
