import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Svg from 'UI/components/Svg';
import ButtonMore from 'components/Common/ButtonMore';
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
    <div className={cn(styles[pageType], styles[view])}>
      <div className={styles.contentWrapper}>
        <div className={styles.bookmarkContainer}>
          <Svg
            type="bookmark"
            className={styles.bookmarkIcon}
          />
          <div className={styles.content}>
            <h3 className={styles.title}>
              {title}
            </h3>
            <ButtonMore
              href={url}
              isLocalLink
              title="See post"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

BookmarkCardSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  pageType: PropTypes.string.isRequired,
};

export default BookmarkCardSection;
