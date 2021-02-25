import React from 'react';
import ScrollDown from './images/scroll-down.svg';
import styles from './styles.module.scss';

export const ScrollIcon = () => (
  <div className={styles.iconWrapper}>
    <div className={styles.scrollDown}>
      <img src={ScrollDown} alt="scroll-down" />
    </div>
    <div className={styles.arrow}>
      <span />
      <span />
    </div>
  </div>
);
