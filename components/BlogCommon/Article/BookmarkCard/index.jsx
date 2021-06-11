import React from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper, Svg } from 'components';
import { ROUTES, SVG_IMAGES_TYPES } from 'utils/constants';
import styles from './styles.module.scss';

export const BookmarkCard = ({ slug, title }) => {
  const { path, dynamicPath } = ROUTES.article.getRoute(slug);

  return slug && (
    <div className={styles.bookmarkContainer}>
      <div>
        <Svg
          type={SVG_IMAGES_TYPES.bookmarkIcon}
          className={styles.bookmarkIconContainer}
        />
      </div>
      <div className={styles.content}>
        <span className={styles.text}>
          You may also like
        </span>
        <div className={styles.title}>
          <LinkWrapper
            path={path}
            dynamicRouting={dynamicPath}
            isLocalLink
          >
            {title}
          </LinkWrapper>
          <Svg
            type={SVG_IMAGES_TYPES.bookmarkArrow}
            className={styles.arrow}
          />
        </div>
      </div>
    </div>
  );
};

BookmarkCard.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
