import {
  EffectCoverflow, Mousewheel, Navigation, Pagination,
} from 'swiper';

export const swiperGalleryParams = {
  effect: 'coverflow',
  slidesPerView: 1.1,
  centeredSlides: true,
  loop: true,
  passiveListeners: true,
  speed: 500,
  spaceBetween: 20,
  mousewheel: {
    forceToAxis: true,
  },
  coverflowEffect: {
    rotate: 0,
    stretch: -40,
    depth: 150,
    slideShadows: false,
  },
  breakpoints: {
    568: {
      slidesPerView: 1.3,
    },
    768: {
      slidesPerView: 1.4,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 1.8,
      spaceBetween: 32,
    },
  },
  modules: [
    EffectCoverflow,
    Pagination,
    Mousewheel,
    Navigation,
  ],
};
