import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { LinkWrapper } from 'components';
import { ArticlePreview } from 'components/Common/ArticlePreview';
import { ROUTES, ARTICLE_PREVIEW_TYPES } from 'utils/constants';
import { Arrow } from './images';
import styles from './styles.module.scss';

const RelatedSection = ({ articles }) => (
  <div className={styles.related}>
    <div className={styles.headingContainer}>
      <div className={styles.heading}>
        <h3>Related Posts</h3>
        <LinkWrapper
          isLocalLink
          path={ROUTES.blog.path}
        >
          See all posts
          <div className={styles.svgContainer}>
            <img
              src={Arrow}
              alt="arrow"
            />
          </div>
        </LinkWrapper>
      </div>
    </div>
    <div className={styles.articlesList}>
      {articles && articles.map(({
        slug,
        title,
        previewImageUrl,
        categoryTag,
      }) => (
        <ArticlePreview
          key={`related/${slug}`}
          slug={slug}
          title={title}
          image={get(previewImageUrl, 'url', '')}
          category={categoryTag}
          type={ARTICLE_PREVIEW_TYPES.related}
        />
      ))}
    </div>
  </div>
);

RelatedSection.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
};

export default RelatedSection;
