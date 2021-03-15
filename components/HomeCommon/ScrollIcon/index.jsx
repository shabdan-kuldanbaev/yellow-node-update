import React from 'react';
import { getPathWithCdn } from 'utils/helper';
import { ScrollDown } from './utils/data';
import styles from './styles.module.scss';

export const ScrollIcon = () => (
  <div className={styles.iconWrapper}>
    <div className={styles.scrollDown}>
      <img src={getPathWithCdn(ScrollDown)} alt="scroll-down" />
    </div>
    <div className={styles.arrow}>
      <span />
      <span />
    </div>
  </div>
);
