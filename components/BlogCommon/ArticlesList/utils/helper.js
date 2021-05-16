import { ANIMATED_TYPE } from 'utils/constants';

export const getAnimationProps = ({
  isSearch = false,
  isMobileResolution = false,
  index = 1,
} = {}) => {
  const delay = isSearch ? (30 * index) : (100 + 50 * index);
  let animatioProps = isSearch
    ? {
      type: ANIMATED_TYPE.isFade,
      delay,
      duration: 200,
      distance: '1rem',
      bottom: true,
      effect: 'fadeInUp',
    }
    : {
      type: ANIMATED_TYPE.isCustom,
      translateY: '1.5em',
      opasityDuration: 1,
      transformDuration: 1,
      transitionDelay: delay,
    };

  if (isMobileResolution) {
    animatioProps = {
      type: ANIMATED_TYPE.isCustom,
      translateY: '0.05em',
      opasityDuration: 0.05,
      transformDuration: 0.05,
      transitionDelay: 100,
    };
  }

  return animatioProps;
};
