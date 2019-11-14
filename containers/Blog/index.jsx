import React from 'react';
import {
  GridArticles,
  SectionTitle,
  ButtonMore,
} from 'components';

import styles from './styles.module.scss';

const Blog = () => (
  <section id="blog" className={styles.blog}>
    <SectionTitle title="Blog" subtitle="How we do what we do" />
    <GridArticles />
    <ButtonMore href="/blog" title="Read more stories" />
  </section>
);

export default Blog;
