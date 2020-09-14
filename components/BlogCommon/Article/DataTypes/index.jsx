import React from 'react';
import get from 'lodash/get';
import { Animated } from 'components';
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
    return get(data, 'data', []) ? (
      <div className={styles.mediasWrapper}>
        <div className={styles.images}>
          {get(data, 'data', []).map((image) => (
            <Animated type={animatedType.imageZoom}>
              <img src={image} alt={image} />
            </Animated>
          ))}
        </div>
        {get(data, 'photoCaption', '') && <div className={styles.photoCaption}>{get(data, 'photoCaption', '')}</div>}
      </div>
    ) : null;
  default:
    return null;
  }
};
