import { Pagination } from 'swiper';

const defaultSwiperParams = {
  modules: [Pagination],
  slidesPerView: 1,
  spaceBetween: 30,
};

export const SWIPER_PARAMS = {
  'enterprise-resource-planning-software-services': {
    ...defaultSwiperParams,
  },
  'fintech-software-development-services': {
    ...defaultSwiperParams,
  },
  'artificial-intelligence-development-services': {
    ...defaultSwiperParams,
  },
  'mobile-bank-application': {
    ...defaultSwiperParams,
  },
  'discovery-phase-services': {
    modules: [Pagination],
    slidesPerView: 'auto',
    spaceBetween: 30,
    breakpoints: {
      300: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1150: {
        slidesPerView: 3,
      },
    },
  },
};
