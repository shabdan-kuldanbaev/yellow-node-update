import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { LinkWrapper, ImageWithPlaceholder } from 'components';
import styles from './styles.module.scss';

export const Article = ({ article }) => {
  const slug = get(article, 'fields.slug', '');
  const imageUrl = get(article, 'fields.headImageUrl.fields.file.url', '');
  const title = get(article, 'fields.title', '');

  return (
    <article className={styles.article}>
      <LinkWrapper
        isLocalLink
        dynamicRouting="/blog/[article]"
        path={`/blog/${slug}`}
      >
        <div>
          <div className={styles.imgContainer}>
            <ImageWithPlaceholder src={imageUrl} imageStyle={styles.img} />
          </div>
          <div className={styles.articleContent}>
            <h2 className={styles.title}><a>{title}</a></h2>
          </div>
        </div>
      </LinkWrapper>
    </article>
  );
};

Article.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
};
