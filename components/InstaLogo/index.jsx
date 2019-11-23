import React from 'react';
import styles from './styles.module.scss';

export default function Logo() {
  return (
    <div className={styles['logo-wrapper']}>
      <div className={styles['logo-image']}>
        <div className={styles.logo}>
          <div className={styles['logo-border']} />
          <div className={styles['logo-circle']} />
          <div className={styles['logo-dot']} />
        </div>
      </div>
    </div>
  );
}