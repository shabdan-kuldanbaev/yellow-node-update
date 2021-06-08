import React from 'react';
import { Svg } from 'components/Common/Svg';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import styles from './styles.module.scss';

export const ScrollIcon = () => (
  <div className={styles.iconWrapper}>
    <Svg
      type={SVG_IMAGES_TYPES.scrollIconSvg}
      className={styles.scrollDown}
    />
    <div className={styles.arrow}>
      <span />
      <span />
    </div>
  </div>
);
