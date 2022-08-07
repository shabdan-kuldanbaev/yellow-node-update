import { FreeMode } from 'swiper';
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
  const iconsGroup = contentModules.filter((modules) => modules.sys.contentType.sys.id !== 'link');

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
    iconsGroup,
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
  grabCursor: true,
  mousewheel: {
    forceToAxis: true,
  },
  modules: [FreeMode],
});
