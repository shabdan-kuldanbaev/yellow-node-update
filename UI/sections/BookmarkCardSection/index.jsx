import PropTypes from 'prop-types';
import cn from 'classnames';
import BookmarkContainer from 'UI/containers/BookmarkContainer';
import { getBookmarkCardProps } from './utils/bookmarkCardHelper';
import styles from './styles.module.scss';

const BookmarkCardSection = ({
  sectionData,
  pageType,
}) => {
  const {
    title,
    view,
    url,
  } = getBookmarkCardProps(sectionData);

  if (!title || !url) {
    return null;
  }

  return (
    <div className={cn(styles.bookmarkSection, styles[pageType], styles[view])}>
      <div className={styles.contentWrapper}>
        <BookmarkContainer
          title={title}
          url={url}
          containerClass={styles.bookmarkContainer}
          titleClass={styles.title}
        />
      </div>
    </div>
  );
};

BookmarkCardSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  pageType: PropTypes.string.isRequired,
};

export default BookmarkCardSection;
