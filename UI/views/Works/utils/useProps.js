import { useCallback, useState } from 'react';
import { useFetchPageQuery } from 'redux/apis/page';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { PAGES } from 'utils/constants';

export default ({ type, ...restProps }) => {
  const { data = {} } = useFetchPageQuery(type);
  const { subtitle } = data;
  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);
  const breadcrumbs = getBreadcrumbs(PAGES.portfolio);

  const openFullscreenEstimation = useCallback(() => setIsFullscreenEstimation(true), []);
  const closeFullscreenEstimation = useCallback(() => setIsFullscreenEstimation(false), []);

  return {
    breadcrumbs,
    subtitle,
    isFullscreenEstimation,
    openFullscreenEstimation,
    closeFullscreenEstimation,
    ...restProps,
  };
};
