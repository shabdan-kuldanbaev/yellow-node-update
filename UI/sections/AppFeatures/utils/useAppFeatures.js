import { useState, useCallback } from 'react';
import get from 'lodash/get';
import { getDocumentFields, getFileUrl } from 'utils/helper';

export const useAppFeatures = ({ data, type }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const imagesData = get(data, 'contentModules');

  const handleOnClick = useCallback((index) => () => {
    setActiveIndex(index);
  });

  const images = imagesData.map((module) => {
    const { images: moduleImages } = getDocumentFields(module);

    return getFileUrl(get(moduleImages, '[0]', {}));
  });

  return {
    type,
    data,
    images,
    activeIndex,
    handleOnClick,
    imagesData,
  };
};
