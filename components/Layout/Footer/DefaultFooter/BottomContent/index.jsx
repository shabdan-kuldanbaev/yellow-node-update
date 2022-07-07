import React from 'react';
import Animated from 'components/Common/Animated';
import { ANIMATED_TYPE } from 'utils/constants';
import rocket from './json/rocket.json';
import styles from './styles.module.scss';

export const BottomContent = () => (
  <div className={styles.bottomContent}>
    <div className={styles.text}>
      <span>© All right reserved. Yellow 2022</span>
    </div>
    <div className={styles.rocket}>
      <Animated
        type={ANIMATED_TYPE.isJSON}
        jsonFile={rocket}
        className={styles.jsonWrapper}
      />
      <div className={styles.stars} />
      <div className={styles.stars2} />
    </div>
  </div>
);
