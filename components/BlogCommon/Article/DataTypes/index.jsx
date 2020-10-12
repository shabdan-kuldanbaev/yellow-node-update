import React from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import {
  Animated,
  BookmarkCard,
  GalleryCard,
} from 'components';
import { articleTags, animatedType } from 'utils/constants';
import styles from './styles.module.scss';

export const DataTypes = ({ type, data }) => {
  const tagData = get(data, 'data', '');
  switch (type) {
  case `${articleTags.h2}`:
    return tagData ? <h2 className={styles.h2}>{tagData}</h2> : null;
  case `${articleTags.paragraph}`:
    return tagData ? <p className={styles.paragraph}>{tagData}</p> : null;
  case `${articleTags.quote}`:
    return tagData ? <blockquote className={styles.quote}>{tagData}</blockquote> : null;
  case `${articleTags.images}`: {
    const imageSrc = get(data, 'image.src', '');
    const photoCaption = get(data, 'photoCaption', '');

    return get(data, 'image', '') ? (
      <div className={styles.imageWrapper}>
        <div className={get(data, 'image.type', '') === 'normal' ? styles.normalImage : styles.fullImage}>
          <Animated type={animatedType.imageZoom}>
            <img src={imageSrc} alt={imageSrc} />
          </Animated>
          {photoCaption && <div className={styles.photoCaption}>{photoCaption}</div>}
        </div>
      </div>
    ) : null;
  }
  case `${articleTags.bookmark}`: {
    const bookmark = get(data, 'data', {});

    return !isEmpty(bookmark) ? (
      <BookmarkCard article={bookmark} />
    ) : null;
  }
  case `${articleTags.gallery}`:
    return get(data, 'data', []).length ? (
      <GalleryCard data={data} />
    ) : null;
  default:
    return null;
  }
};
