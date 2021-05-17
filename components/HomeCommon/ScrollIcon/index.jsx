import React from 'react';
import { staticImagesUrls } from 'utils/helper';
import styles from './styles.module.scss';

export const ScrollIcon = () => (
  <div className={styles.iconWrapper}>
    <div className={styles.scrollDown}>
      <img
        src={staticImagesUrls.scrollDownIcon}
        alt="scroll-down"
      />
    </div>
    <div className={styles.arrow}>
      <span />
      <span />
    </div>
  </div>
);
