import { useState, useMemo } from 'react';
import get from 'lodash/get';
import { getDocumentFields, getFileUrl } from 'utils/helper';

export default ({ data, type }) => {
  const {
    title: sectionTitle,
    description: sectionDescription,
  } = data;

  const [activeIndex, setActiveIndex] = useState(0);

  const parsedData = useMemo(() => get(data, 'contentModules'), [data]);

  const promoImage = getFileUrl(data.images[0]);

  const imagesData = parsedData?.map((module) => {
    const { images } = getDocumentFields(module, ['images']);

    return getFileUrl(get(images, '[0]', {}));
  });

  const content = parsedData?.map((module) => {
    const { title, text } = getDocumentFields(module);

    return { title, text };
  });

  const handleClick = (index) => () => {
    if (index === activeIndex) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };

  return {
    type,
    sectionTitle,
    sectionDescription,
    content,
    imagesData,
    handleClick,
    activeIndex,
    promoImage,
  };
};
