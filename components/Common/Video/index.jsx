import React from 'react';
import PropTypes from 'prop-types';

export const Video = ({ src, className }) => (
  <video
    autoPlay
    loop
    muted
    className={className}
  >
    <source src={src} type="video/mp4" />
  </video>
);

Video.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
