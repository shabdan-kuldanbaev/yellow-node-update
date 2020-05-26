import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { Brackets } from '../images';

export const CarouselItem = ({
  avatar,
  name,
  position,
  text,
}) => (
  <div className={styles.carouselItem}>
    <div>
      <img src={avatar} alt={name} style={{ backgroundImage: `url(${avatar})` }} />
    </div>
    <p>
      <img src={Brackets} alt="Brackets" />
      {text}
    </p>
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
