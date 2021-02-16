import React from 'react';
import PropTypes from 'prop-types';
import { withController } from 'react-scroll-parallax';

const ImageWithController = ({
  src,
  alt,
  parallaxController,
}) => {
  const handleLoad = () => {
    parallaxController.update();
  };

  return (
    <img
      src={src}
      alt={alt}
      onLoad={handleLoad}
    />
  );
};

ImageWithController.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  parallaxController: PropTypes.instanceOf(Object).isRequired,
};

export default withController(ImageWithController);
