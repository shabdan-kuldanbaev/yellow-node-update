import { FreeMode } from 'swiper';

export const SELECTOR_SWIPER_PARAMS = {
  cssMode: true,
  enabled: true,
  slidesPerView: 'auto',
  passiveListeners: true,
  freeMode: true,
  mousewheel: {
    forceToAxis: true,
  },
  autoplay: {
    delay: 800,
    disableOnInteraction: false,
  },
  speed: 500,
  spaceBetween: 24,
  modules: [FreeMode],
  breakpoints: {
    768: {
      spaceBetween: 48,
    },
  },
};
