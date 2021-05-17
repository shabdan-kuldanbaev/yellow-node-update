import React from 'react';
import { Svg } from 'components';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import styles from './styles.module.scss';

export const ScrollIcon = () => (
  <div className={styles.iconWrapper}>
    <div className={styles.scrollDown}>
      <Svg type={SVG_IMAGES_TYPES.scrollIconSvg} />
    </div>
    <div className={styles.arrow}>
      <span />
      <span />
    </div>
  </div>
);
