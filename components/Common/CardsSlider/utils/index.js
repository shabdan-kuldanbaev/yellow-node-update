import { Pagination } from 'swiper';

export const DEFAULT_SWIPER_PARAMS = {
  modules: [Pagination],
  slidesPerView: 1,
  spaceBetween: 30,
};

export const SWIPER_PARAMS = {
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
