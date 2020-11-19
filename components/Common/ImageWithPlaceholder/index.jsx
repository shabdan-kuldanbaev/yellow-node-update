import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const ImageWithPlaceholder = ({ src, imageStyle }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const image = new window.Image(src);

  useEffect(() => {
    if (image.complete) setIsLoaded(true);
  }, []);

  return <div className={imageStyle} style={isLoaded ? { backgroundImage: `url(${src})` } : { backgroundColor: '#f1f1f2' }} />;
};

ImageWithPlaceholder.proprTypes = {
  src: PropTypes.string.isRequired,
  imageStyle: PropTypes.instanceOf(Object).isRequired,
};
