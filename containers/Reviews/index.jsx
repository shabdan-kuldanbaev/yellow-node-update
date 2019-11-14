import React from 'react';
import { Carousel, SectionTitle } from 'components';

import styles from './styles.module.scss';

const Reviews = () => (
  <section id="reviews" className={styles.reviews}>
    <SectionTitle title="What people say" />
    <Carousel />
  </section>
);

export default Reviews;
