import React from 'react';
import styles from './styles.module.scss';

export const InstaLogo = () => (
  <div className={styles['logo-wrapper']}>
    <div className={styles['logo-image']}>
      <div className={styles.logo}>
        <div className={styles['logo-border']}>
          <div className={styles.overlay} />
        </div>
        <div className={styles['logo-circle']}>
          <div className={styles.overlay} />
        </div>
        <div className={styles['logo-dot']} />
      </div>
    </div>
  </div>
);
