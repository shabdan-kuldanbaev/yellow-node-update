import React from 'react';
import { articles } from './utils/data';

import styles from './styles.module.scss';

const GridArticles = () => (
  <div className={styles.articlesGrid}>
    {articles.map(art => (
      art.priority === 'low'
        ? (
          <div key={`blog/${art.id}`} className={`${styles.item} ${styles[art.priority]}`}>
            <div className={styles.image} style={{ backgroundImage: `url(${art.image})` }} />
            <span className={styles.title}>{art.title}</span>
            <span className={styles.publishedDate}>{art.publishedDate}</span>
          </div>
        )
        : (
          <div
            key={`blog/${art.id}`}
            className={`${styles.item} ${styles[art.priority]}`}
            style={{ backgroundImage: `url(${art.image})` }}
          >
            <div className={styles.overlay} />
            <span className={styles.title}>{art.title}</span>
            <span className={styles.publishedDate}>{art.publishedDate}</span>
          </div>
        )
    ))}
  </div>
);

export default GridArticles;
