import React from 'react';
import { Portfolio } from 'components';
import styles from './styles.module.scss';

const PortfolioContainer = ({ introSection }) => (
  <section ref={introSection} className={styles.portfolio}>
    <Portfolio />
  </section>
);

export default PortfolioContainer;
