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
  } = getDocumentFields(article, [
    'title',
    'previewImageUrl',
    'slug',
  ]);

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

export const getSwiperParams = () => ({
  effect: 'slide',
  slidesPerView: 1.05,
  centeredSlides: true,
  spaceBetween: 30,
  loop: false,
  passiveListeners: true,
  mousewheel: {
    forceToAxis: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      centeredSlides: false,
    },
    1024: {
      slidesPerView: 3,
      centeredSlides: false,
    },
  },
  ...SWIPER_NAV_PARAMS,
});
