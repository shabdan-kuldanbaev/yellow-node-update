import React from 'react';
import PropTypes from 'prop-types';
import {
  LinkWrapper,
  Loader,
  ImageWithPlaceholder,
} from 'components';
import { getFileUrl, getOptimizedImage } from 'utils/helper';
import { ROUTES } from 'utils/constants';
import styles from './styles.module.scss';

const NextPrev = ({
  isNewer,
  isLoading,
  previewImageUrl,
  slug,
  title,
}) => {
  const previewImage = getOptimizedImage(previewImageUrl, 230);

  const linkProps = {
    isLocalLink: true,
    dynamicRouting: '/blog/[article]',
    path: ROUTES.article(slug),
  };

  return (slug && title && previewImage ? (
    <Loader isLoading={!isLoading}>
      <div className={isNewer ? styles.newer : styles.older}>
        <LinkWrapper {...linkProps}>
          <div className={styles.imgContainer}>
            <ImageWithPlaceholder src={previewImage} imageStyle={styles.img} />
          </div>
        </LinkWrapper>
        <div className={styles.content}>
          <small>{isNewer ? 'NEWER POST' : 'OLDER POST'}</small>
          <h3 className={styles.title}>
            <LinkWrapper {...linkProps}>
              {title}
            </LinkWrapper>
          </h3>
        </div>
      </div>
    </Loader>
  ) : null);
};

NextPrev.defaultProps = {
  isNewer: false,
};

NextPrev.propTypes = {
  isNewer: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  previewImageUrl: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default NextPrev;
