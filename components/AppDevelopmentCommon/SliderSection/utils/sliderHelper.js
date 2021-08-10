import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';

export const getSliderProps = (data) => {
  const {
    title,
    description,
    contentModules,
  } = getDocumentFields(
    data,
    [
      'title',
      'description',
      'contentModules',
    ],
  );
  const { contentModules: slides } = getDocumentFields(get(contentModules, '[0]', []));
  const animationProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };
  const params = {
    slidesPerView: 1,
    spaceBetween: 150,
    slidesPerGroup: 1,
    mousewheel: {
      forceToAxis: true,
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    breakpoints: {
      1025: {
        slidesPerGroup: 2,
        slidesPerView: 2,
      },
    },
  };

  return {
    title,
    description,
    slides,
    animationProps,
    params,
  };
};
