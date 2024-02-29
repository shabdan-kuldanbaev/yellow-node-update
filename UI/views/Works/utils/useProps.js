import {
  useCallback,
  useContext,
  useState,
} from 'react';
import { IntroSectionContext } from 'utils/appContext';

export default ({ ...restProps }) => {
  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);

  const introSection = useContext(IntroSectionContext);

  const openFullscreenEstimation = useCallback(() => setIsFullscreenEstimation(true), []);
  const closeFullscreenEstimation = useCallback(() => setIsFullscreenEstimation(false), []);

  return {
    isFullscreenEstimation,
    introSection,
    openFullscreenEstimation,
    closeFullscreenEstimation,
    ...restProps,
  };
};
