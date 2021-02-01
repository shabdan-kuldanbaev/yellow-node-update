import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Animated } from 'components';
import { ANIMATED_TYPE, NUMBER_OF_IMAGES_PER_LINE } from 'utils/constants';
import { getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

export const GalleryCard = ({ images, photoCaption }) => {
  const imageRef = useRef(null);
  const rowsCount = Math.ceil(images.length / NUMBER_OF_IMAGES_PER_LINE);

  const getImagesInRow = useCallback(
    (row) => images.filter((image, index) => index >= row * NUMBER_OF_IMAGES_PER_LINE && index <= (row + 1) * NUMBER_OF_IMAGES_PER_LINE - 1),
    [images, rowsCount],
  );

  const handleOnLoad = ({ target }) => {
    const { offsetWidth, offsetHeight, parentElement } = target;
    const rowChildren = get(parentElement, 'parentElement.children', []);
    const setFlex = (flex) => parentElement.style.flex = flex;

    if (rowChildren.length === 1) setFlex('1 1 0%');
    else setFlex(`${offsetWidth / offsetHeight} 1 0%`);
  };

  return (
    <div className={styles.mediasWrapper}>
      <div className={styles.images} ref={imageRef}>
        {[...Array(rowsCount)].map((row, index) => (
          <div className={styles.row}>
            {getImagesInRow(index).map((image) => {
              const imageUrl = getFileUrl(image);

              return (
                <Animated type={ANIMATED_TYPE.imageZoom}>
                  <img
                    src={imageUrl}
                    alt={imageUrl}
                    onLoad={handleOnLoad}
                  />
                </Animated>
              );
            })}
          </div>
        ))}
      </div>
      {photoCaption && <div className={styles.photoCaption}>{photoCaption}</div>}
    </div>
  );
};

GalleryCard.propTypes = {
  images: PropTypes.string.isRequired,
  photoCaption: PropTypes.string.isRequired,
};
