import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { ArticlePreview } from 'components/Common/ArticlePreview';
import LinkWrapper from 'UI/components/LinkWrapper';
import {
  ROUTES,
  ARTICLE_PREVIEW_TYPES,
  SVG_IMAGES_TYPES,
  REVEAL_ANIMATION_PROPS,
} from 'utils/constants';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const RelatedSection = ({ articles }) => (
  <div className={styles.related}>
    <div className={styles.headingContainer}>
      <div className={styles.heading}>
        <h3>Related Posts</h3>
        <LinkWrapper
          isLocalLink
          path={ROUTES.blog.path}
        >
          <>
            See all posts
            <Svg
              type={SVG_IMAGES_TYPES.nearbyArrow}
              className={styles.svgContainer}
            />
          </>
        </LinkWrapper>
      </div>
    </div>
    <div className={styles.articlesList}>
      {articles && articles.map(({
        slug,
        title,
        previewImageUrl,
        categoryTag,
      }, index) => (
        <ArticlePreview
          key={`related/${slug}`}
          slug={slug}
          title={title}
          image={get(previewImageUrl, 'url', '')}
          category={categoryTag}
          type={ARTICLE_PREVIEW_TYPES.related}
          animatioProps={{ ...REVEAL_ANIMATION_PROPS, delay: 50 * index }}
        />
      ))}
    </div>
  </div>
);

RelatedSection.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
};

export default RelatedSection;
