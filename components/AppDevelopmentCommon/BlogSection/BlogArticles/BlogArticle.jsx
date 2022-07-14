import React from 'react';
import styles from './styles.module.scss';

const BlogArticle = ({ previewUrl, articleTitle, slug }) => (
  <div className={styles.articleTile}>
    <img
      src={previewUrl}
      alt={articleTitle}
      className={styles.articleImage}
    />
    <div className={styles.description}>
      <h3 className={styles.articleTitle}>{articleTitle}</h3>
      <span className={styles.readMore}>Read more</span>
    </div>
  </div>
);

export default BlogArticle;
