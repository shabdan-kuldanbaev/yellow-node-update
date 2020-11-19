import React from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper, ImageWithPlaceholder } from 'components';
import Like from './images/like.svg';
import styles from './styles.module.scss';

export const BookmarkCard = ({ article }) => (
  article ? (
    <div className={styles.bookmarkContainer}>
      <div className={styles.bookmarkCard}>
        <div className={styles.content}>
          <h3>
            <LinkWrapper
              isLocalLink
              dynamicRouting="/blog/[article]"
              path={`/blog/${article.slug}`}
            >
              {article.title}
            </LinkWrapper>
          </h3>
          <div className={styles.description}>{article.description}</div>
          <div className={styles.metadata}>
            <LinkWrapper
              isLocalLink
              dynamicRouting="/blog/[article]"
              path={`/blog/${article.slug}`}
            >
              <img src={Like} alt="like" />
              <span>Recommended</span>
            </LinkWrapper>
          </div>
        </div>
        <div className={styles.imgContainer}>
          <ImageWithPlaceholder src={article.image} imageStyle={styles.img} />
        </div>
      </div>
    </div>
  ) : null
);

BookmarkCard.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
};
