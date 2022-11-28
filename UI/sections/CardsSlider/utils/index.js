import React from 'react';
import get from 'lodash/get';
import { Navigation } from 'swiper';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';

export const getServiceParams = (service) => {
  const {
    title,
    images,
    contentModules,
    description,
    imagesBundles,
  } = getDocumentFields(
    service,
    [
      'title',
      'images',
      'contentModules',
      'description',
      'imagesBundles',
    ],
  );

  const imageUrl = getFileUrl(get(images, '[0]'));
  const imageBgUrl = getFileUrl(get(imagesBundles, '[0]'));
  const buttonTitle = get(contentModules, '[0].fields.buttonTitle');
  const serviceUrl = get(contentModules, '[0].fields.url');

  return {
    title,
    description,
    imageUrl,
    imageBgUrl,
    buttonTitle,
    serviceUrl,
  };
};

export const getSwiperParams = () => ({
  modules: [Navigation],
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
});
