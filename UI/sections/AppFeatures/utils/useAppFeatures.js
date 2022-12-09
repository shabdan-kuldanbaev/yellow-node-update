import { useCallback, useState } from 'react';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { selectIsMobileResolutions } from 'redux/selectors/layout';

export const useAppFeatures = ({ section, type, isPromoImage }) => {
  const {
    title,
    description,
    subtitle,
    view,
    contentModules: imagesData,
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
  const isMobileResolution = useSelector(selectIsMobileResolutions);

  const handleOnClick = useCallback((index) => () => {
    setActiveIndex(index);
  });

  const images = imagesData.map((module) => {
    const { images: moduleImages } = getDocumentFields(module);

    return getFileUrl(get(moduleImages, '[0]', {}));
  });

  const promoImages = imagesData.map((module) => {
    const { contentModules } = getDocumentFields(module);

    return get(contentModules, '[0].fields');
  });

  return {
    view,
    type,
    title,
    description,
    subtitle,
    images,
    activeIndex,
    handleOnClick,
    imagesData,
    promoImages,
    isMobileResolution,
    isPromoImage,
  };
};
