import React from 'react';
import styles from './styles.module.scss';

export const SectionTitle = ({
  type,
  title,
  subtitle,
  text,
}) => (
  <div className={styles.sectionTitle}>
    <h2 className={styles.title}>
      {title}
    </h2>
    <p className={styles.subtitle}>
      {text}
    </p>
  </div>
);
