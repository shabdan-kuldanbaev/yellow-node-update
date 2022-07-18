import React from 'react';
import get from 'lodash/get';
import SwiperNavButton from 'components/SwiperNavButton';
import { getDocumentFields } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';

export const getRelatedServicesProps = (sectionData) => {
  const {
    title,
    description,
    subtitle,
    contentModules,
    view,
  } = getDocumentFields(
    sectionData,
    [
      'title',
      'description',
      'contentModules',
      'subtitle',
      'view',
    ],
  );
  const { contentModules: services } = getDocumentFields(get(contentModules, '[0]', []));
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };
  const link = getDocumentFields(get(contentModules, '[1]'));

  return {
    title,
    description,
    subtitle,
    services,
    link,
    view,
    animatedProps,
  };
};

export const getSwiperParams = () => ({
  effect: 'slide',
  slidesPerView: 1.2,
  centeredSlides: true,
  spaceBetween: 40,
  loop: false,
  passiveListeners: true,
  mousewheel: {
    forceToAxis: true,
  },
  breakpoints: {
    1024: {
      slidesPerView: 3,
      centeredSlides: false,
    },
  },
  navigation: {
    nextEl: '.swiper-next-el',
    prevEl: '.swiper-prev-el',
  },
  renderNextButton: () => (
    <SwiperNavButton
      type="arrowRight"
      text="next"
      className="swiper-next-el"
    />
  ),
  renderPrevButton: () => (
    <SwiperNavButton
      type="arrowLeft"
      text="previous"
      className="swiper-prev-el"
    />
  ),
});
