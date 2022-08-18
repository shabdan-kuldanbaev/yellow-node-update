import React from 'react';
import Svg from 'components/Common/Svg';
import styles from './styles.module.scss';

const ScrollIcon = () => (
  <div className={styles.iconWrapper}>
    <Svg
      type="arrowBottom"
      className={styles.scrollDown}
    />
    <div className={styles.arrow}>
      <span />
      <span />
    </div>
  </div>
);

export default ScrollIcon;
