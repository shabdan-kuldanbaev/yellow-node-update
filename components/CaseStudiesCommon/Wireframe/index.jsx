import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

const Wireframe = ({ imageUrl, type }) => (
  <div className={cn(styles.imagesContainer, styles[type])}>
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
  type: PropTypes.string.isRequired,
};

export default Wireframe;
