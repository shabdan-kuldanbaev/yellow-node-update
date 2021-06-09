import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LinkWrapper, Svg } from 'components';
import { ROUTES, SVG_IMAGES_TYPES } from 'utils/constants';

import styles from './styles.module.scss';

const NextPrev = ({ isNewer, slug }) => {
  const { path, dynamicPath } = ROUTES.article.getRoute(slug);
  const linkProps = {
    isLocalLink: true,
    path,
    dynamicRouting: dynamicPath,
  };

  return slug && (
    <div className={cn({
      [styles.newer]: isNewer,
      [styles.older]: !isNewer,
    })}
    >
      <LinkWrapper {...linkProps}>
        <span>{isNewer ? 'next post' : 'previous post'}</span>
        <Svg
          type={SVG_IMAGES_TYPES.nearbyArrow}
          className={styles.arrow}
        />
      </LinkWrapper>
    </div>
  );
};

NextPrev.defaultProps = {
  isNewer: false,
  slug: '',
};

NextPrev.propTypes = {
  isNewer: PropTypes.bool,
  slug: PropTypes.string,
};

export default NextPrev;
