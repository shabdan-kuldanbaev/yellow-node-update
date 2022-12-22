import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMetaData } from 'redux/selectors/layout';
import { rootUrl } from 'utils/helper';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';

export const useProcess = ({ introSection, json }) => {
  const metaData = useSelector(selectMetaData);
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
