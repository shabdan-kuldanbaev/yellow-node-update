import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const CarouselItem = ({
  avatar,
  name,
  position,
  text,
}) => (
  <div className={styles.carouselItem}>
    <img src={avatar} alt={name} />
    <p>{text}</p>
    <div className={styles.personName}>
      <span className={styles.title}>{name}</span>
      <span className={styles.divider}>—</span>
      <span className={styles.position}>{position}</span>
    </div>
  </div>
);

CarouselItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CarouselItem;
