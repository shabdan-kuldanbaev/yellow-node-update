import {
  EffectCoverflow,
  Mousewheel,
  Navigation,
  Pagination,
} from 'swiper';

export const swiperGalleryParams = {
  effect: 'coverflow',
  slidesPerView: 1.1,
  centeredSlides: true,
  loop: true,
  passiveListeners: true,
  speed: 500,
  mousewheel: {
    forceToAxis: true,
  },
  coverflowEffect: {
    rotate: 0,
    stretch: -40,
    depth: 150,
    slideShadows: false,
  },
  modules: [
    EffectCoverflow,
    Pagination,
    Mousewheel,
    Navigation,
  ],
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
