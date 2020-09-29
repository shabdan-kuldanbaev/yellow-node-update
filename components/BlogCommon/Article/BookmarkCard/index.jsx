import React from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper } from 'components';
import Like from './images/like.png';
import styles from './styles.module.scss';

export const BookmarkCard = ({ article }) => (
  article ? (
    <div className={styles.bookmarkContainer}>
      <div className={styles.bookmarkCard}>
        <a>
          <div className={styles.content}>
            <h3><a>{article.title}</a></h3>
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
            <div className={styles.img} style={{ backgroundImage: `url(${article.image})` }} />
          </div>
        </a>
      </div>
    </div>
  ) : null
);

BookmarkCard.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
};
