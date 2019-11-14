import React from 'react';
import {
  InstaTape,
  SectionTitle,
  ButtonMore,
} from 'components';

import styles from './styles.module.scss';

const Insta = () => (
  <section id="insta" className={styles.insta}>
    <SectionTitle title="Live" subtitle="How we live and work" />
    <InstaTape />
    <ButtonMore href="/insta" title="Follow on Instagram" />
  </section>
);

export default Insta;
