import React from 'react';
import get from 'lodash/get';
import SwiperNavButton from 'components/SwiperNavButton';
import { getDocumentFields } from 'utils/helper';

export const getGalleryProps = (data) => {
  const {
    title,
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
    navigation: {
      nextEl: '.swiper-next-el',
      prevEl: '.swiper-prev-el',
    },
    coverflowEffect: {
      rotate: 0,
      stretch: -40,
      depth: 150,
      slideShadows: false,
    },
    renderNextButton: () => (
      <SwiperNavButton
        type="next"
        className="swiper-next-el"
      />
    ),
    renderPrevButton: () => (
      <SwiperNavButton
        type="prev"
        className="swiper-prev-el"
      />
    ),
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
    slides,
    linkData,
    params,
  };
};
