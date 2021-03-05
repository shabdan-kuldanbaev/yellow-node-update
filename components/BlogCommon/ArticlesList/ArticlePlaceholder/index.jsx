import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import styles from './sytles.module.scss';

export const ArticlePlaceholder = () => (
  <article className={styles.article}>
    <Skeleton
      variant="rect"
      height="40vh"
      className={styles.imagePlaceholder}
    />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="rect" height="40px" width="180px" />
  </article>
);
