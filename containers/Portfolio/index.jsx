import React from 'react';
import {
  Works,
  SectionTitle,
  ButtonMore,
} from 'components';

import styles from './styles.module.scss';

const Portfolio = () => (
  <section id="portfolio" className={styles.portfolio}>
    <SectionTitle title="Portfolio" subtitle="We brainstorm, contribute, and grow your product together. Every step of the way." />
    <Works />
    <SectionTitle title="check out more works by Yellow" subtitle="We brainstorm, contribute, and grow your product together. Every step of the way." />
    <ButtonMore href="/portfolio" title="Explore our portfolio" />
  </section>
);

export default Portfolio;
