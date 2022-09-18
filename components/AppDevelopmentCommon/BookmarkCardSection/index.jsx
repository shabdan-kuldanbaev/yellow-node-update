import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import LinkWrapper from 'components/Common/LinkWrapper';
import Svg from 'components/Common/Svg';
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
            <div className={styles.title}>
              {title}
            </div>
            <LinkWrapper
              path={url}
              isLocalLink
            >
              See post
            </LinkWrapper>
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
