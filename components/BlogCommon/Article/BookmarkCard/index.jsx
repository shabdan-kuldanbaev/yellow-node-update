import React from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper, ImageWithPlaceholder } from 'components';
import { getOptimizedImage } from 'utils/helper';
import { ROUTES } from 'utils/constants';
import Like from './images/like.svg';
import styles from './styles.module.scss';

export const BookmarkCard = ({
  slug,
  description,
  title,
  image,
}) => {
  const linkProps = {
    isLocalLink: true,
    dynamicRouting: '/blog/[article]',
    path: ROUTES.article(slug),
  };

  return (
    <div className={styles.bookmarkContainer}>
      <div className={styles.bookmarkCard}>
        <div className={styles.content}>
          <h3>
            <LinkWrapper {...linkProps}>
              {title}
            </LinkWrapper>
          </h3>
          <div className={styles.description}>{description}</div>
          <div className={styles.metadata}>
            <LinkWrapper {...linkProps}>
              <img src={Like} alt="like" />
              <span>Recommended</span>
            </LinkWrapper>
          </div>
        </div>
        <div className={styles.imgContainer}>
          <ImageWithPlaceholder src={getOptimizedImage(image, 510)} />
        </div>
      </div>
    </div>
  );
};

BookmarkCard.propTypes = {
  slug: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
