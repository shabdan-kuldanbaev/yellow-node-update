import { useCallback, useState } from 'react';
import { useFetchPageQuery } from 'redux/apis/page';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { PAGES } from 'utils/constants';

export default ({ type, ...restProps }) => {
  const { data = {} } = useFetchPageQuery(type);
  console.log('🚀 ~ file: useProps.js:8 ~ data:', data);
  const { subtitle, pageTitle: title } = data;
  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);
  const breadcrumbs = getBreadcrumbs(PAGES.portfolio);

  const openFullscreenEstimation = useCallback(() => setIsFullscreenEstimation(true), []);
  const closeFullscreenEstimation = useCallback(() => setIsFullscreenEstimation(false), []);

  return {
    breadcrumbs,
    title,
    subtitle,
    isFullscreenEstimation,
    openFullscreenEstimation,
    closeFullscreenEstimation,
    ...restProps,
  };
};
