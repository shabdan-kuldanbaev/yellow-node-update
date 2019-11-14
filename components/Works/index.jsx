import React, { Fragment } from 'react';
import First from './First';
import Second from './Second';
import Third from './Third';
import styles from './styles.module.scss';

const Works = () => (
  <div className={styles.worksContainer}>
    <First />
    <Second />
    <Third />
  </div>
);

export default Works;
