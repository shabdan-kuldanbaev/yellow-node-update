import { useCallback, useState } from 'react';
import get from 'lodash/get';
import { getDocumentFields, getFileUrl } from 'utils/helper';

export const useAppFeatures = ({ section, type, isPromoImage }) => {
  const {
    title,
    description,
    subtitle,
    view,
    contentModules: itemsData,
  } = getDocumentFields(
    section,
    [
      'title',
      'description',
      'contentModules',
      'subtitle',
      'view',
    ],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOnClick = useCallback((index) => () => {
    if (index === activeIndex) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  });

  const images = itemsData?.map((module) => {
    const { images: moduleImages } = getDocumentFields(module);

    return getFileUrl(get(moduleImages, '[0]', {}));
  });

  const imageSrc = images[activeIndex === -1 ? 0 : activeIndex];

  const promoImages = itemsData?.map((module) => {
    const { contentModules } = getDocumentFields(module);

    return get(contentModules, '[0].fields');
  });

  return {
    view,
    type,
    title,
    description,
    subtitle,
    activeIndex,
    handleOnClick,
    itemsData,
    promoImages,
    isPromoImage,
    imageSrc,
  };
};
