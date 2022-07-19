import React from 'react';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedContentfulImage,
} from 'utils/helper';
import { SWIPER_NAV_PARAMS } from 'utils/constants';

export const getBlogArticles = (blogArticles = []) => blogArticles.map((article) => {
  const {
    title,
    previewImageUrl,
    slug,
  } = getDocumentFields(
    article, [
      'title',
      'previewImageUrl',
      'slug',
    ],
  );

  const previewUrl = getOptimizedContentfulImage(
    getFileUrl(previewImageUrl),
    {
      width: 407,
      height: 304,
    },
  );

  return {
    articleTitle: title,
    slug,
    previewUrl,
  };
});

export const getSwiperParams = () => {
  const mobileSwiperParams = {
    effect: 'coverflow',
    slidesPerView: 1.1,
    spaceBetween: 20,
    centeredSlides: true,
    loop: false,
    passiveListeners: true,
    mousewheel: {
      forceToAxis: true,
    },
    coverflowEffect: {
      rotate: 0,
      stretch: -30,
      depth: 110,
      modifier: 1,
      slideShadows: false,
    },
    breakpoints: {
      480: {
        coverflowEffect: {
          stretch: -45,
        },
      },
    },
    ...SWIPER_NAV_PARAMS,
  };

  const desktopSwiperParams = {
    ...mobileSwiperParams,
    effect: 'slide',
    centeredSlides: false,
    slidesPerView: 1,
    breakpoints: {
      769: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
    navigation: {},
    renderNextButton: () => null,
    renderPrevButton: () => null,
    spaceBetween: 30,
  };

  return { mobileSwiperParams, desktopSwiperParams };
};
