import React from 'react';
import get from 'lodash/get';
import cn from 'classnames';
import {
  Animated,
  BookmarkCard,
  GalleryCard,
} from 'components';
import { articleTags, animatedType } from 'utils/constants';
import styles from './styles.module.scss';

export const DataTypes = ({ type, data }) => {
  switch (type) {
  case `${articleTags.h2}`:
    return get(data, 'data', '')
      ? <h2 className={styles.h2}>{get(data, 'data', '')}</h2>
      : null;
  case `${articleTags.paragraph}`:
    return get(data, 'data', '')
      ? <p className={styles.paragraph}>{get(data, 'data', '')}</p>
      : null;
  case `${articleTags.quote}`:
    return get(data, 'data', '')
      ? <blockquote className={styles.quote}>{get(data, 'data', '')}</blockquote>
      : null;
  case `${articleTags.images}`:
    return get(data, 'image', '') ? (
      <div className={styles.imageWrapper}>
        <div className={get(data, 'image.type', '') === 'normal' ? styles.normalImage : styles.fullImage}>
          <Animated type={animatedType.imageZoom}>
            <img src={get(data, 'image.src', '')} alt={get(data, 'image.src', '')} />
          </Animated>
          {get(data, 'photoCaption', '') && <div className={styles.photoCaption}>{get(data, 'photoCaption', '')}</div>}
        </div>
      </div>
    ) : null;
  case `${articleTags.bookmark}`:
    return get(data, 'data', []) ? (
      <BookmarkCard article={get(data, 'data', [])} />
    ) : null;
  case `${articleTags.gallery}`:
    return get(data, 'data', []) ? (
      <GalleryCard data={data} />
    ) : null;
  default:
    return null;
  }
};
