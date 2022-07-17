import React from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { PAGES } from 'utils/constants';
import styles from '../BlogArticles/styles.module.scss';

const BlogArticle = ({
  previewUrl,
  articleTitle,
  slug,
}) => (
  <div className={styles.articleTile}>
    <img
      src={previewUrl}
      alt={articleTitle}
      className={styles.articleImage}
    />
    <div className={styles.description}>
      <h3 className={styles.articleTitle}>{articleTitle}</h3>
      <LinkWrapper
        className={styles.readMore}
        path={`${PAGES.blog}/${slug}`}
      >
        Read more
      </LinkWrapper>
    </div>
  </div>
);

BlogArticle.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  articleTitle: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default BlogArticle;
