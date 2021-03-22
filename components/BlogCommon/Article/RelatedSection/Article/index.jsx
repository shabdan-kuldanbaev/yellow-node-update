import React from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper, ImageWithPlaceholder } from 'components';
import { getOptimizedImage } from 'utils/helper';
import { ROUTES } from 'utils/constants';
import styles from './styles.module.scss';

export const Article = ({
  slug,
  title,
  image,
}) => (slug && title && image && (
  <article className={styles.article}>
    <LinkWrapper
      isLocalLink
      path={ROUTES.article.path(slug)}
      dynamicRouting={ROUTES.article.dynamicPath}
    >
      <div>
        <div className={styles.imgContainer}>
          <ImageWithPlaceholder src={getOptimizedImage(image, 720)} imageStyle={styles.img} />
        </div>
        <div className={styles.articleContent}>
          <h2 className={styles.title}><a>{title}</a></h2>
        </div>
      </div>
    </LinkWrapper>
  </article>
));

Article.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
