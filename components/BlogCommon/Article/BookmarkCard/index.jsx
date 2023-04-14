import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import LinkWrapper from 'components/Common/LinkWrapper';
import { ROUTES, SVG_IMAGES_TYPES } from 'utils/constants';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const BookmarkCard = ({ slug, title, buttonTitle }) => {
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

export default BookmarkCard;
