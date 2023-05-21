import { FreeMode } from 'swiper';

const DEFAULT_SPACE_BETWEEN = 60;

const SPACE_BETWEEN_PAGES = {
  'software-quality-assurance-services': 45,
};

const SWIPER_PARAMS = {
  enabled: true,
  slidesPerView: 'auto',
  passiveListeners: true,
  freeMode: true,
  mousewheel: {
    forceToAxis: true,
  },
  rewind: true,
  speed: 500,
  modules: [FreeMode],
};

export const getSwiperParams = (slug) => ({
  ...SWIPER_PARAMS,
  spaceBetween: SPACE_BETWEEN_PAGES[slug] || DEFAULT_SPACE_BETWEEN,
});
