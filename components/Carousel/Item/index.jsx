import React from 'react';
import PropTypes from 'proptypes';

import styles from './styles.module.scss';

const CarouselItem = ({
  avatar,
  name,
  position,
  text,
}) => (
  <div className={styles.carouselItem}>
    <div className={styles.personInfo}>
      <img src={avatar} alt={name} />
      <div className={styles.personName}>
        <span>{name}</span>
        <p>{position}</p>
      </div>
    </div>
    <p>{text}</p>
  </div>
);

CarouselItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CarouselItem;
