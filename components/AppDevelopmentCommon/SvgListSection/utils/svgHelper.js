import { Autoplay, FreeMode } from 'swiper';
import { getDocumentFields } from 'utils/helper';
import { PAGES } from 'utils/constants';

export const getSvgSectionProps = (data) => {
  let link = null;
  const {
    title,
    description,
    contentModules,
    view,
  } = getDocumentFields(
    data,
    [
      'title',
      'description',
      'contentModules',
      'view',
    ],
  );
  const linkData = contentModules.find((modules) => modules.sys.contentType.sys.id === 'link');
  const iconsGroups = contentModules.filter((modules) => modules.sys.contentType.sys.id !== 'link');

  if (linkData) {
    const {
      title: linkTitle,
      buttonTitle,
      type,
    } = getDocumentFields(linkData);

    link = {
      linkTitle,
      buttonTitle,
      type,
    };
  }

  return {
    title,
    description,
    link,
    view,
    iconsGroups,
  };
};

export const getSvgGroupProps = (data) => getDocumentFields(data, ['title', 'contentList']);

export const checkSwiperEnabled = (type, view, isTabletResolution) => {
  if (type === PAGES.customChatApp) {
    return false;
  }

  if (type === PAGES.mlDevelopment && view === 'firstSectionView') {
    return false;
  }

  return !(type === PAGES.androidDevelopmentServices && view === 'firstSectionView' && !isTabletResolution);
};

export const getSwiperParams = ({ isEnabled = true }) => ({
  enabled: isEnabled,
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
