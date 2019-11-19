import React from 'react';
import { AdvantagesItems, SectionTitle } from 'components';

import styles from './styles.module.scss';

const Advantages = () => (
  <section className={styles.advantages}>
    <SectionTitle title="WE KICK ASS ON" />
    <AdvantagesItems />
  </section>
);

export default Advantages;
