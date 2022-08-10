import React from 'react';
import PropTypes from 'prop-types';
import LinkWrapper from 'components/Common/LinkWrapper';
import { getOptimizedImage } from 'utils/helper';
import { ROUTES } from 'utils/constants';
import styles from './styles.module.scss';

export const Article = ({
  slug,
  title,
  image,
}) => {
  const { path, dynamicPath } = ROUTES.article.getRoute(slug);

  return slug && title && image && (
    <article className={styles.article}>
      <LinkWrapper
        isLocalLink
        path={path}
        dynamicRouting={dynamicPath}
      >
        <div>
          <div className={styles.imgContainer}>
            <img
              className={styles.img}
              src={getOptimizedImage(image, 510)}
              alt={title}
            />
          </div>
          <div className={styles.articleContent}>
            <h2 className={styles.title}>
              <span>{title}</span>
            </h2>
          </div>
        </div>
      </LinkWrapper>
    </article>
  );
};

Article.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
