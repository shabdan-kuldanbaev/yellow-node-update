import React from 'react';
import { Carousel, SectionTitle } from 'components';
import styles from './styles.module.scss';

export const Reviews = () => (
  <section className={styles.reviews}>
    <SectionTitle title="What people say" />
    <Carousel />
  </section>
);
