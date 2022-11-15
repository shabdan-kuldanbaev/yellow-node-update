import { Autoplay, FreeMode } from 'swiper';
import { getDocumentFields } from 'utils/helper';

const getSwiperParams = () => ({
  enabled: true,
  slidesPerView: 'auto',
  spaceBetween: 60,
  passiveListeners: true,
  freeMode: true,
  mousewheel: {
    forceToAxis: true,
  },
  rewind: true,
  autoplay: {
    delay: 800,
    disableOnInteraction: false,
  },
  speed: 500,
  modules: [Autoplay, FreeMode],
});

export const useSvgGroup = ({
  type,
  view,
  data,
  isSwiperEnabled,
  className,
  hideTitle,
}) => {
  const { title, contentList: icons } = getDocumentFields(data, ['title', 'contentList']);

  const swiperParams = getSwiperParams();

  return {
    type,
    view,
    icons,
    title,
    className,
    hideTitle,
    swiperParams,
    isSwiperEnabled,
  };
};
