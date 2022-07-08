import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Image from 'next/image';

import styles from './styles.module.scss';
// eslint-disable-next-line import/named
import { getOptimizedContentfulImage, patchImageUrl } from './utils/helper';

function ContentfulImageLoader({
  src, quality, width, height,
}) {
  let url = src;

  if (width) {
    url = patchImageUrl(url, width, 'w');
  }

  if (height) {
    url = patchImageUrl(url, height, 'h');
  }

  return `${url}&q=${quality}`;
}

const CustomImage = ({
  width,
  height,
  priority,
  layout,
  objectFit,
  focusArea,
  fit,
  className,
  containerClasses,
  fm,
  src,
  backgroundColor,
  isRounded,
  scale,
  ...other
}) => {
  if (!src) {
    return null;
  }

  const lazyProps = !priority ? {
    loading: 'lazy',
    placeholder: 'blur',
    blurDataURL: getOptimizedContentfulImage(src, {
      width: 50,
      fm: 'jpg',
      fl: 'progressive',
      bg: backgroundColor,
      isRounded,
    }),
  } : undefined;

  const imageSize = layout !== 'fill' ? {
    width,
    height,
  } : {};

  return (
    <picture className={cn(styles.picture, containerClasses)}>
      <source srcSet={getOptimizedContentfulImage(src, {
        fm: 'jpg',
        fl: 'progressive',
        fit,
        focusArea,
        bg: backgroundColor,
        isRounded,
      })}
      />
      <Image
        loader={ContentfulImageLoader}
        src={getOptimizedContentfulImage(src, {
          width,
          height,
          bg: backgroundColor,
          fm,
          fit,
          focusArea,
          isRounded,
        })}
        objectFit={objectFit}
        priority={priority}
        layout={layout}
        quality={100}
        className={className}
        {...imageSize}
        {...lazyProps}
        {...other}
      />
    </picture>
  );
};

CustomImage.defaultProps = {
  width: null,
  height: null,
  fit: '',
  focusArea: 'center',
  fm: 'webp',
  layout: null,
  priority: false,
  objectFit: 'cover',
  isRounded: false,
  scale: 1,
  className: '',
  containerClasses: '',
};

CustomImage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  width: PropTypes.number,
  height: PropTypes.number,
  priority: PropTypes.bool,
  fit: PropTypes.string,
  fm: PropTypes.string,
  focusArea: PropTypes.oneOf([
    'center',
    'top',
    'right',
    'left',
    'bottom',
    'top_right',
    'top_left',
    'bottom_right',
    'bottom_left',
    'face',
    undefined,
  ]),
  layout: PropTypes.oneOf([
    'fill',
    'fixed',
    'intrinsic',
    'responsive',
    'raw',
    undefined,
  ]),
  objectFit: PropTypes.oneOf([
    'fill',
    'contain',
    'cover',
    'none',
    'scale-down',
    undefined,
  ]),
  isRounded: PropTypes.bool,
  scale: PropTypes.number,
  className: PropTypes.string,
  containerClasses: PropTypes.string,
};

export default CustomImage;
