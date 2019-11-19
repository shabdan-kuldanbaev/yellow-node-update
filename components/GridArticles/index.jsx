import React from 'react';
import { articles } from './utils/data';

import styles from './styles.module.scss';

const GridArticles = () => (
  <div className={styles.articlesGrid}>
    {articles.map(art => (
      art.priority === 'low'
        ? (
          <div key={`blog/${art.id}`} className={styles[art.priority]}>
            <div className={styles.imgContainer}>
              <div className={styles.image} style={{ backgroundImage: `url(${art.image})` }} />
            </div>
            <span className={styles.title}>{art.title}</span>
            <span className={styles.publishedDate}>{art.publishedDate}</span>
          </div>
        )
        : (
          <div key={`blog/${art.id}`} className={styles[art.priority]}>
            <div className={styles.overlay} />
            <div className={styles.imgContainer}>
              <div className={styles.image} style={{ backgroundImage: `url(${art.image})` }} />
            </div>
            <div className={styles.desc}>
              <span className={styles.title}>{art.title}</span>
              <span className={styles.publishedDate}>{art.publishedDate}</span>
            </div>
          </div>
        )
    ))}
  </div>
);

export default GridArticles;
