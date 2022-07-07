import React from 'react';
import { instaPhotos } from './utils/data';
import styles from './styles.module.scss';

const InstaTape = ({ instaPhotos: photos }) => (
  <div className={styles.instaTape}>
    {photos && photos.map((photo) => (
      <div
        key={`insta/${photo}`}
        className={styles.imgContainer}
      >
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${photo})` }}
        />
      </div>
    ))}
  </div>
);

InstaTape.defaultProps = {
  instaPhotos,
};

export default InstaTape;
