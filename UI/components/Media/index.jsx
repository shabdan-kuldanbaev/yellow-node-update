import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';
import useMediaProps from './utils/useMediaProps';
import styles from './styles.module.scss';

const Media = (props) => {
  const {
    url,
    isVideo,
    className,
    imageProps,
    ...rest
  } = useMediaProps(props);

  if (isVideo) {
    return (
      <video
        muted
        autoPlay
        loop
        playsInline
        className={className}
        {...rest}
      >
        <source
          src={url}
          type="video/mp4"
        />
      </video>
    );
  }

  return (
    <picture className={cn(styles.image, className)}>
      <Image {...imageProps} />
    </picture>
  );
};

Media.propTypes = {
  asset: PropTypes.instanceOf(Object).isRequired,
  autoPlay: PropTypes.bool,
  loop: PropTypes.bool,
  playsInline: PropTypes.bool,
  layout: PropTypes.oneOf([
    'fill',
    'intrinsic',
    'fixed',
    'responsive',
  ]),
};

export default Media;
