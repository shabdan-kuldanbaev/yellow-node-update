import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

export const ImageWithPlaceholder = ({ src }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleOnLoad = () => setIsLoaded(true);

  return (
    <img
      className={cn(styles.image, { [styles.loaded]: isLoaded })}
      src={src}
      alt={src}
      onLoad={handleOnLoad}
    />
  );
};

ImageWithPlaceholder.proprTypes = {
  src: PropTypes.string.isRequired,
  imageStyle: PropTypes.instanceOf(Object).isRequired,
};
