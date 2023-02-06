import { FreeMode } from 'swiper';

export const SWIPER_PARAMS = {
  modules: [FreeMode],
  enabled: true,
  slidesPerView: 'auto',
  spaceBetween: 16,
  passiveListeners: true,
  freeMode: {
    enabled: true,
    sticky: true,
  },
  mousewheel: {
    forceToAxis: true,
  },
  rewind: true,
  speed: 500,
};
