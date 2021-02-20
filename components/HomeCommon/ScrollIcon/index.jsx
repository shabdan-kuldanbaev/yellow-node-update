import React from 'react';
import styles from './styles.module.scss';

export const ScrollIcon = () => (
  <div className={styles.iconWrapper}>
    <div className={styles.scrollDown} />
    <div className={styles.arrow}>
      <span />
      <span />
    </div>
  </div>
);
