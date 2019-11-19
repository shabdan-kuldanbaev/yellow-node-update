import React from 'react';
import {
  First,
  Second,
  Third,
} from './index';

import styles from './styles.module.scss';

const Works = () => (
  <div className={styles.worksContainer}>
    {[<First key={`works/first`} />, <Second />, <Third />].map(component => component)}
  </div>
);

export default Works;
