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
  <LinkWrapper
    className={styles.articleTile}
    path={`${PAGES.blog}/${slug}`}
  >
    <img
      src={previewUrl}
      alt={articleTitle}
      className={styles.articleImage}
    />
    <div className={styles.description}>
      <h3 className={styles.title}>{articleTitle}</h3>
      <span className={styles.readMore}>
        Read more
      </span>
    </div>
  </LinkWrapper>
);

BlogArticle.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  articleTitle: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default BlogArticle;
