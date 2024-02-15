import { useCallback, useContext, useState } from 'react';
import { getPage } from 'utils/dataFetching/getPage';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { PAGES } from 'utils/constants';
import { IntroSectionContext } from 'utils/appContext';

export default async ({ type, ...restProps }) => {
  const { data = {} } = await getPage(type);
  const { subtitle, pageTitle: title } = data;
  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);
  const breadcrumbs = getBreadcrumbs(PAGES.portfolio);

  const introSection = useContext(IntroSectionContext);

  const openFullscreenEstimation = useCallback(() => setIsFullscreenEstimation(true), []);
  const closeFullscreenEstimation = useCallback(() => setIsFullscreenEstimation(false), []);

  return {
    breadcrumbs,
    title,
    subtitle,
    isFullscreenEstimation,
    introSection,
    openFullscreenEstimation,
    closeFullscreenEstimation,
    ...restProps,
  };
};
