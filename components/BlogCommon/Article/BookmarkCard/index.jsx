import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { LinkWrapper, ImageWithPlaceholder } from 'components';
import Like from './images/like.svg';
import styles from './styles.module.scss';

export const BookmarkCard = ({ data }) => {
  const article = get(data, 'fields.article.fields', {});
  const slug = get(data, 'fields.article.fields.slug', '');
  const description = get(data, 'fields.article.fields.description', '');
  const title = get(data, 'fields.article.fields.title', '');
  const imageUrl = get(data, 'fields.image.fields.file.url', '');

  return (
    article ? (
      <div className={styles.bookmarkContainer}>
        <div className={styles.bookmarkCard}>
          <div className={styles.content}>
            <h3>
              <LinkWrapper
                isLocalLink
                dynamicRouting="/blog/[article]"
                path={`/blog/${slug}`}
              >
                {title}
              </LinkWrapper>
            </h3>
            <div className={styles.description}>{description}</div>
            <div className={styles.metadata}>
              <LinkWrapper
                isLocalLink
                dynamicRouting="/blog/[article]"
                path={`/blog/${slug}`}
              >
                <img src={Like} alt="like" />
                <span>Recommended</span>
              </LinkWrapper>
            </div>
          </div>
          <div className={styles.imgContainer}>
            <ImageWithPlaceholder src={imageUrl} />
          </div>
        </div>
      </div>
    ) : null
  );
};

BookmarkCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};
