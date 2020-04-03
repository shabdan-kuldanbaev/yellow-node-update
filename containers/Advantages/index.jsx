import React from 'react';
import { AdvantagesItems, SectionTitle } from 'components';
import styles from './styles.module.scss';

const Advantages = () => (
  <section className={styles.advantages}>
    <SectionTitle
      title="We kick ass on"
      subtitle="We brainstorm, contribute, and grow your product together. Every step of the way."
      styleSubtitle={styles.subtitle}
    />
    <AdvantagesItems />
  </section>
);

export default Advantages;
