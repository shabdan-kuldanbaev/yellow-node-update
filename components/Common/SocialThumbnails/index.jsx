import React from 'react';
import { twitter, facebook, copyLink } from './images';
import styles from './styles.module.scss';

export const SocialThumbnails = () => (
  <div className={styles.socialThumbnails}>
    <div>
      <div className={styles.svgContainer}>
        <img className={styles.svg} src={twitter} alt="twitter" />
      </div>
      <div className={styles.svgContainer}>
        <img className={styles.svg} src={facebook} alt="facebook" />
      </div>
      <div className={styles.svgContainer}>
        <img className={styles.svg} src={copyLink} alt="copy link" />
      </div>
    </div>
  </div>
);
