import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export const Arrow = ({
  src,
  alt,
  onClick,
}) => (
  <img
    src={src}
    alt={alt}
    className={styles.arrow}
    onClick={onClick}
  />
);

Arrow.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
