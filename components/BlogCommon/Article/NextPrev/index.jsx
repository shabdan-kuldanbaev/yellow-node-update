import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import cn from 'classnames';
import LinkWrapper from 'components/Common/LinkWrapper';
import { ROUTES, SVG_IMAGES_TYPES } from 'utils/constants';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const NextPrev = ({ isNewer, slug }) => {
  const { path, dynamicPath } = ROUTES.article.getRoute(slug);

  return slug && (
    <div className={cn({
      [styles.newer]: isNewer,
      [styles.older]: !isNewer,
    })}
    >
      <LinkWrapper
        isLocalLink
        path={path}
        dynamicRouting={dynamicPath}
      >
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
