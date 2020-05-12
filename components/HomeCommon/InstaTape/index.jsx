import React from 'react';
import styles from './styles.module.scss';
import { instaPhotos } from './utils/data';

export const InstaTape = () => (
  <div className={styles.instaTape}>
    {instaPhotos.map((photo, index) => (
      <div key={`insta/${index}`} className={styles.imgContainer}>
        <div className={styles.image} style={{ backgroundImage: `url(${photo})` }} />
      </div>
    ))}
  </div>
);
