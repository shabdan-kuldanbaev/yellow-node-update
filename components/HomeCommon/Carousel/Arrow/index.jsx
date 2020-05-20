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
    onClick={onClick}
    className={styles.arrow}
  />
);

Arrow.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
