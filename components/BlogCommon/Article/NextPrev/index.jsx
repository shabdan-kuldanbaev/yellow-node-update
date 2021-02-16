import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LinkWrapper, ImageWithPlaceholder } from 'components';
import { getOptimizedImage } from 'utils/helper';
import { ROUTES } from 'utils/constants';
import styles from './styles.module.scss';

const NextPrev = ({
  isNewer,
  previewImageUrl,
  slug,
  title,
}) => {
  const linkProps = {
    isLocalLink: true,
    path: ROUTES.article.path(slug),
    dynamicRouting: ROUTES.article.dynamicPath,
  };

  return ((slug && title && previewImageUrl) && (
    <div className={cn({
      [styles.newer]: isNewer,
      [styles.older]: !isNewer,
    })}
    >
      <LinkWrapper {...linkProps}>
        <div className={styles.imgContainer}>
          <ImageWithPlaceholder src={getOptimizedImage(previewImageUrl, 230)} imageStyle={styles.img} />
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
  ));
};

NextPrev.defaultProps = {
  isNewer: false,
  slug: '',
  title: '',
};

NextPrev.propTypes = {
  isNewer: PropTypes.bool,
  previewImageUrl: PropTypes.string.isRequired,
  slug: PropTypes.string,
  title: PropTypes.string,
};

export default NextPrev;
