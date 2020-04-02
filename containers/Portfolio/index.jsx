import React from 'react';
import {
  Works,
  SectionTitle,
  ButtonMore,
} from 'components';

import styles from './styles.module.scss';

const Portfolio = () => (
  <section className={styles.portfolio}>
    <Works />
    <div className={styles.bottomOfPortfolio}>
      <SectionTitle
        title="Check out more works by Yellow"
        styleTitle={styles.title}
        subtitle="We brainstorm, contribute, and grow your product together. Every step of the way."
        styleSubtitle={styles.subtitle}
      />
      <ButtonMore
        href="/portfolio"
        title="Explore our portfolio"
        buttonStyle={styles.portfolioButton}
      />
    </div>
  </section>
);

export default Portfolio;
