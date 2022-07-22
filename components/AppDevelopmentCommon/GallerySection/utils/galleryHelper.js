import React from 'react';
import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';
import { SWIPER_NAV_PARAMS } from 'utils/constants';

export const getGalleryProps = (data) => {
  const {
    title,
    description,
    contentModules,
  } = getDocumentFields(data);
  const galleryData = get(contentModules, '[0]', {});
  const { contentModules: slides } = getDocumentFields(galleryData);
  const linkData = get(contentModules, '[1]', null);
  const params = {
    effect: 'coverflow',
    slidesPerView: 1.1,
    centeredSlides: true,
    loop: true,
    passiveListeners: true,
    speed: 500,
    mousewheel: {
      forceToAxis: true,
    },
    coverflowEffect: {
      rotate: 0,
      stretch: -40,
      depth: 150,
      slideShadows: false,
    },
    ...SWIPER_NAV_PARAMS,
    breakpoints: {
      1025: {
        slidesPerView: 1.8,
        spaceBetween: 0,
        coverflowEffect: {
          rotate: 0,
          stretch: -100,
          depth: 150,
        },
      },
    },
  };

  return {
    title,
    description,
    slides,
    linkData,
    params,
  };
};
