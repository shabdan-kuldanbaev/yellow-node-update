import React from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper } from 'components';
import styles from './styles.module.scss';

export const Article = ({
  article: {
    slug,
    image,
    title,
  },
}) => (
  <article className={styles.article}>
    <LinkWrapper
      isLocalLink
      dynamicRouting="/blog/[article]"
      path={`/blog/${slug}`}
    >
      <div>
        <div className={styles.imgContainer}>
          <div className={styles.img} style={{ backgroundImage: `url(${image})` }} />
        </div>
        <div className={styles.articleContent}>
          <h2 className={styles.title}><a>{title}</a></h2>
        </div>
      </div>
    </LinkWrapper>
  </article>
);

Article.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
};
