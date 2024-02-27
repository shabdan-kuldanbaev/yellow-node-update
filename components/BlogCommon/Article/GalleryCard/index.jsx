'use client';

import { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import get from 'lodash/get';

import Illustration from 'UI/components/Illustration';
import { ANIMATED_TYPE, ARTICLE_PHOTO_GALLERY_IMAGES_PER_LINE } from 'utils/constants';
import { getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const GalleryCard = ({ images, photoCaption = '' }) => {
  const imageRef = useRef(null); // TODO replace imageRef with something for the garrely row key
  const rowsCount = Math.ceil(images.length / ARTICLE_PHOTO_GALLERY_IMAGES_PER_LINE);

  const getImagesInRow = useCallback(
    // eslint-disable-next-line max-len
    (row) => images.filter((image, index) => index >= row * ARTICLE_PHOTO_GALLERY_IMAGES_PER_LINE && index <= (row + 1) * ARTICLE_PHOTO_GALLERY_IMAGES_PER_LINE - 1),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [images, rowsCount],
  );

  const handleOnLoad = ({ target }) => {
    const { offsetWidth, offsetHeight, parentElement } = target;
    const rowChildren = get(parentElement, 'parentElement.children', []);

    const setFlex = (flex) => {
      parentElement.style.flex = flex;
    };

    rowChildren.length === 1
      ? setFlex('1 1 0%')
      : setFlex(`${offsetWidth / offsetHeight} 1 0%`);
  };

  return (
    <div className={styles.mediasWrapper}>
      <div
        className={styles.images}
        ref={imageRef}
      >
        {[...Array(rowsCount)].map((row, index) => (
          <div
            className={styles.row}
            key={`gallery/${imageRef}`}
          >
            {getImagesInRow(index).map((image) => {
              const imageUrl = getFileUrl(image);

              return (
                <Animated
                  type={ANIMATED_TYPE.imageZoom}
                  key={`gallery/${imageUrl}`}
                >
                  <Illustration
                    layout="responsive"
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
      {photoCaption && (
        <div className={styles.photoCaption}>
          {photoCaption}
        </div>
      )}
    </div>
  );
};

GalleryCard.propTypes = {
  images: PropTypes.instanceOf(Array).isRequired,
  photoCaption: PropTypes.string,
};

export default GalleryCard;
