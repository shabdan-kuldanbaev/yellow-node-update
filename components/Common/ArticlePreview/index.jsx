import React from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper } from 'components';
import { getOptimizedImage } from 'utils/helper';
import { ROUTES } from 'utils/constants';
import styles from './styles.module.scss';

export const ArticlePreview = ({
  slug,
  title,
  image,
  category,
  type,
}) => {
  const { path, dynamicPath } = ROUTES.article.getRoute(slug);
  const { path: categoryPath, dynamicPath: categoryDynamicPath } = ROUTES.blog.getRoute(category);
  const articleLinkProps = {
    isLocalLink: true,
    path,
    dynamicRouting: dynamicPath,
  };

  return slug && title && image && (
    <article className={styles[type]}>
      <LinkWrapper {...articleLinkProps}>
        <div className={styles.imgContainer}>
          <img
            className={styles.img}
            src={getOptimizedImage(image, 510)}
            alt={title}
          />
        </div>
      </LinkWrapper>
      <div className={styles.articleContent}>
        <LinkWrapper
          isLocalLink
          path={categoryPath}
          dynamicRouting={categoryDynamicPath}
        >
          <span className={styles.category}>
            {category}
          </span>
        </LinkWrapper>
        <LinkWrapper {...articleLinkProps}>
          <h3 className={styles.title}>
            <span>
              {title}
            </span>
          </h3>
        </LinkWrapper>
      </div>
    </article>
  );
};

ArticlePreview.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
