import { useState } from 'react';
import cn from 'classnames';
import get from 'lodash/get';
import {
  getDocumentFields,
  getFileUrl,
  getImage,
} from 'utils/helper';
import styles from '../styles.module.scss';

export const useAppFeatures = ({ section, type, isPromoImage }) => {
  const {
    title,
    description,
    subtitle,
    images,
    view,
    contentModules: itemsData,
  } = getDocumentFields(
    section,
    [
      'title',
      'description',
      'contentModules',
      'subtitle',
      'images',
      'view',
    ],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOnClick = (index) => () => {
    if (index === activeIndex) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };

  const itemsImages = itemsData?.map((module) => {
    const { images: moduleImages } = getDocumentFields(module);

    return getFileUrl(get(moduleImages, '[0]', {}));
  });

  const promoImages = itemsData?.map((module) => {
    const { contentModules } = getDocumentFields(module, ['contentModules']);

    const { url } = getDocumentFields(get(contentModules, '[0]', {}), ['url']);

    return url;
  });

  const imageSrc = itemsImages[activeIndex === -1 ? 0 : activeIndex];

  const promoSrc = promoImages[activeIndex === -1 ? 0 : activeIndex];

  const [logoImage] = (images || []).map(getImage);

  const className = cn(
    styles.section,
    styles[type],
    styles[view],
  );

  const titleProps = {
    title,
    description,
    subtitle,
    className: styles.titleWrapper,
  };

  return {
    view,
    type,
    className,
    titleProps,
    activeIndex,
    handleOnClick,
    itemsData,
    logoImage,
    promoSrc,
    isPromoImage,
    imageSrc,
  };
};
