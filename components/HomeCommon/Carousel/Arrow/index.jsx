import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export const Arrow = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className={styles.arrow}
  />
);

Arrow.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
