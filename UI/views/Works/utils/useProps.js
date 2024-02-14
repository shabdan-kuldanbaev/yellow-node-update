import { useCallback, useState } from 'react';
import { getPage } from 'utils/dataFetching/getPage';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { PAGES } from 'utils/constants';

export default async ({ type, ...restProps }) => {
  const { data = {} } = await getPage(type);
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
