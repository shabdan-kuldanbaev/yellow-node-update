import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const Wireframe = ({ imageUrl }) => (
  <div className={styles.imagesContainer}>
    <div className={styles.leftGradient} />
    <div className={styles.rightGradient} />
    <img
      src={imageUrl}
      className={styles.image}
      alt=""
    />
  </div>
);

Wireframe.prototype = {
  imageUrl: PropTypes.string.isRequired,
};

export default Wireframe;
