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
  } = useMediaProps(props);

  if (isVideo) {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        className={className}
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
  layout: PropTypes.oneOf([
    'fill',
    'intrinsic',
    'fixed',
    'responsive',
  ]),
};

export default Media;
