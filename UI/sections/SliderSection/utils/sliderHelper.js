import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';

export const getSliderProps = (data) => {
  const {
    title,
    subtitle,
    description,
    contentModules,
  } = getDocumentFields(
    data,
    [
      'title',
      'subtitle',
      'description',
      'contentModules',
    ],
  );
  const slides = getDocumentFields(get(contentModules, '[0]', []))?.contentModules.map((slide) => {
    const {
      title: slideTitle,
      description: slideDescription,
      text,
    } = getDocumentFields(
      slide,
      [
        'title',
        'description',
        'text',
      ],
    );

    return {
      slideTitle,
      slideDescription,
      text,
    };
  });

  const params = {
    slidesPerView: 1,
    spaceBetween: 32,
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
    subtitle,
    description,
    slides,
    params,
  };
};
