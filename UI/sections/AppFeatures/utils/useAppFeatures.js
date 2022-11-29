import { useCallback, useState } from 'react';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { selectIsMobileResolutions } from 'redux/selectors/layout';

export const useAppFeatures = ({ section, type, isPromoImage }) => {
  const data = section?.fields;
  const [activeIndex, setActiveIndex] = useState(0);
  const imagesData = get(data, 'contentModules');
  const view = get(data, 'view');
  console.log('view: ', view);
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
    data,
    images,
    activeIndex,
    handleOnClick,
    imagesData,
    promoImages,
    isMobileResolution,
    isPromoImage,
  };
};
