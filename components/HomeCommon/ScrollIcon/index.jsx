import React from 'react';
import { getPathWithCdn } from 'utils/helper';
import { STATIC_IMAGES } from 'utils/constants';
import styles from './styles.module.scss';

export const ScrollIcon = () => (
  <div className={styles.iconWrapper}>
    <div className={styles.scrollDown}>
      <img src={getPathWithCdn(STATIC_IMAGES.scrollDownIcon)} alt="scroll-down" />
    </div>
    <div className={styles.arrow}>
      <span />
      <span />
    </div>
  </div>
);
