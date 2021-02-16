import React from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import { Brackets, Star } from '../images';
import styles from './styles.module.scss';

export const CarouselItem = ({
  avatar,
  name,
  position,
  text,
}) => {
  const commaIndex = position && position.indexOf(',', 0);

  return (
    <div className={styles.carouselItem}>
      <div className={styles.text}>
        <img src={Brackets} alt="Brackets" />
        <p>{text}</p>
      </div>
      <div className={styles.person}>
        <img
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          alt={name}
          style={{ backgroundImage: `url(${avatar})` }}
          className={styles.photo}
        />
        <div className={styles.info}>
          <span className={styles.title}>{name}</span>
          <span className={styles.position}>
            {commaIndex && position.substr(0, commaIndex + 1)}
            <br />
            {commaIndex && position.substr(commaIndex + 1)}
          </span>
          <Rating
            start={0}
            stop={5}
            emptySymbol={(
              <img
                src={Star}
                alt={name}
                className={styles.star}
              />
            )}
            readonly
          />
        </div>
      </div>
      <div />
    </div>
  );
};

CarouselItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
