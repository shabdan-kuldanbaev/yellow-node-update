import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Image from 'next/image';
import {
  ContentfulImageLoader,
  getOptimizedContentfulImage,
  staticImageLoader,
} from './utils/helper';
import styles from './styles.module.scss';

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
  style,
  scale,
  isStatic,
  ref,
  ...other
}) => {
  if (!src) {
    return null;
  }

  const lazyProps = !priority ? {
    loading: 'lazy',
    placeholder: 'blur',
    blurDataURL: isStatic ? src : getOptimizedContentfulImage(src, {
      width: 1,
      fm: 'webp',
      bg: backgroundColor,
      isRounded,
      q: 1,
      w: 50,
    }),
  } : undefined;

  const imageSize = {};

  if (width) {
    imageSize.width = width;
  }

  if (height) {
    imageSize.height = height;
  }

  return (
    <picture
      style={style}
      className={cn(styles.picture, containerClasses)}
    >
      <source srcSet={isStatic ? src : getOptimizedContentfulImage(src, {
        fm: 'webp',
        fl: 'progressive',
        fit,
        focusArea,
        bg: backgroundColor,
        isRounded,
      })}
      />
      <Image
        ref={ref}
        loader={isStatic ? staticImageLoader : ContentfulImageLoader}
        src={isStatic ? src : getOptimizedContentfulImage(src, {
          width: width * scale,
          height: height * scale,
          bg: backgroundColor,
          fm,
          fit,
          focusArea,
          isRounded,
        })}
        unoptimized={isStatic}
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
  style: null,
  scale: 1,
  className: '',
  containerClasses: '',
};

CustomImage.propTypes = {
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
  style: PropTypes.instanceOf(Object),
  scale: PropTypes.number,
  className: PropTypes.string,
  containerClasses: PropTypes.string,
};

export default CustomImage;
