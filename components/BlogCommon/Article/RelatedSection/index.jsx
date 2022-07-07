import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { ArticlePreview } from 'components/Common/ArticlePreview';
import LinkWrapper from 'components/Common/LinkWrapper';
import Svg from 'components/Common/Svg';
import {
  ROUTES,
  ARTICLE_PREVIEW_TYPES,
  SVG_IMAGES_TYPES,
  ANIMATED_TYPE,
} from 'utils/constants';
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
          <Svg
            type={SVG_IMAGES_TYPES.nearbyArrow}
            className={styles.svgContainer}
          />
        </LinkWrapper>
      </div>
    </div>
    <div className={styles.articlesList}>
      {articles && articles.map(({
        slug,
        title,
        previewImageUrl,
        categoryTag,
      }, index) => {
        const animationProps = {
          type: ANIMATED_TYPE.isCustom,
          translateY: '1.5em',
          opasityDuration: 1,
          transformDuration: 1,
          transitionDelay: 50 + 50 * index,
        };

        return (
          <ArticlePreview
            key={`related/${slug}`}
            slug={slug}
            title={title}
            image={get(previewImageUrl, 'url', '')}
            category={categoryTag}
            type={ARTICLE_PREVIEW_TYPES.related}
            animatioProps={animationProps}
          />
        );
      })}
    </div>
  </div>
);

RelatedSection.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
};

export default RelatedSection;
