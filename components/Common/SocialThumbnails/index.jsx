import React from 'react';
import {
  Twitter,
  Facebook,
  CopyLink,
} from './images';
import styles from './styles.module.scss';

export const SocialThumbnails = () => (
  <div className={styles.socialThumbnails}>
    <div className={styles.thumbnailsContainer}>
      <div className={styles.svgContainer}>
        <img className={styles.svg} src={Twitter} alt="twitter" />
      </div>
      <div className={styles.svgContainer}>
        <img className={styles.svg} src={Facebook} alt="facebook" />
      </div>
      <div className={styles.svgContainer}>
        <img className={styles.svg} src={CopyLink} alt="copy link" />
      </div>
    </div>
  </div>
);
