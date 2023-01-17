import { CASE_STUDIES_TYPES } from 'utils/constants';
import { getSwiperParams } from './challengesSliderHelper';

export const useChallengesSlider = ({
  type,
  componentType,
  isMobileResolution,
  isSlider,
  children,
}) => {
  const isSpecialSwiper = componentType === CASE_STUDIES_TYPES.challengesSpecialSlider;
  const swiperParams = getSwiperParams(componentType);

  return {
    type,
    isMobileResolution,
    isSlider,
    children,
    isSpecialSwiper,
    swiperParams,
  };
};