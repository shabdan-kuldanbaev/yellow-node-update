import React from 'react';
import PropTypes from 'prop-types';
import { Brackets } from '../images';
import styles from './styles.module.scss';

export const CarouselItem = ({
  avatar,
  name,
  position,
  text,
}) => (
    <div className={styles.carouselItem}>
      <img
        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        alt={name}
        style={{ backgroundImage: `url(${avatar})` }}
      />
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
