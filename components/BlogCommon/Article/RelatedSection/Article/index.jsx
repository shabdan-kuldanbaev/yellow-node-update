import React from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper } from 'components';
import { getOptimizedImage } from 'utils/helper';
import { ROUTES } from 'utils/constants';
import styles from './styles.module.scss';

export const Article = ({
  slug,
  title,
  image,
  category,
}) => {
  const { path, dynamicPath } = ROUTES.article.getRoute(slug);

  return slug && title && image && (
    <article className={styles.article}>
      <LinkWrapper
        isLocalLink
        path={path}
        dynamicRouting={dynamicPath}
      >
        <div className={styles.imgContainer}>
          <img
            className={styles.img}
            src={getOptimizedImage(image, 510)}
            alt={title}
          />
        </div>
        <div className={styles.articleContent}>
          <span className={styles.category}>
            {category}
          </span>
          <p className={styles.title}>
            <span>
              {title}
            </span>
          </p>
        </div>
      </LinkWrapper>
    </article>
  );
};

Article.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
