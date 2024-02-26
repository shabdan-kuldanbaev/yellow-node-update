import { useCallback, useContext, useState } from 'react';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { PAGES } from 'utils/constants';
import { IntroSectionContext } from 'utils/appContext';

export default ({ ...restProps }) => {
  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);
  const breadcrumbs = getBreadcrumbs(PAGES.portfolio);

  const introSection = useContext(IntroSectionContext);

  const openFullscreenEstimation = useCallback(() => setIsFullscreenEstimation(true), []);
  const closeFullscreenEstimation = useCallback(() => setIsFullscreenEstimation(false), []);

  return {
    breadcrumbs,
    isFullscreenEstimation,
    introSection,
    openFullscreenEstimation,
    closeFullscreenEstimation,
    ...restProps,
  };
};
