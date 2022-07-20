import React from 'react';
import get from 'lodash/get';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { SWIPER_NAV_PARAMS } from 'utils/constants';

export const getReviewsProps = (data) => {
  let reviews = [];
  const {
    title,
    contentModules,
  } = getDocumentFields(data);
  const { contentModules: reviewsData } = getDocumentFields(get(contentModules, '[0]', {}));
  const link = getDocumentFields(get(contentModules, '[1]', {}));

  if (reviewsData) {
    reviews = reviewsData.map((module) => {
      const {
        contentModules: review,
        text,
        images,
      } = getDocumentFields(module);
      const logo = getFileUrl(get(images, '[0]', ''));
      const {
        avatar,
        fullName: name,
        position,
      } = getDocumentFields(get(review, '[0]'));

      return {
        name,
        position,
        avatar: getFileUrl(avatar),
        logo,
        text,
      };
    });
  }

  return {
    reviews,
    title,
    link,
  };
};

export const getSwiperParams = () => {
  const mobileSwiperParams = {
    effect: 'coverflow',
    slidesPerView: 1.2,
    spaceBetween: 0,
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
    centeredSlides: true,
    slidesPerView: 1.05,
    breakpoints: {
      768: {
        slidesPerView: 2,
        centeredSlides: false,
      },
      1024: {
        centeredSlides: false,
        slidesPerView: 3,
      },
    },
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-next-el',
      prevEl: '.swiper-prev-el',
    },
  };

  return { mobileSwiperParams, desktopSwiperParams };
};
