import React, {
  useCallback,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Animated } from 'components';
import { animatedType, NUMBER_OF_IMAGES_PER_LINE } from 'utils/constants';
import styles from './styles.module.scss';

export const GalleryCard = ({ data: { data: images, photoCaption } }) => {
  const imageRef = useRef(null);
  const rowsCount = Math.ceil(images.length / NUMBER_OF_IMAGES_PER_LINE);

  const getImagesInRow = useCallback(
    (row) => images.filter((image, index) => index >= row * NUMBER_OF_IMAGES_PER_LINE && index <= (row + 1) * NUMBER_OF_IMAGES_PER_LINE - 1),
    [images, rowsCount],
  );

  const handleOnLoad = ({ target }) => {
    const rowChildren = get(target, 'parentElement.parentElement.children', []);
    if (rowChildren.length === 1) target.parentElement.style.flex = '1 1 0%';
    else target.parentElement.style.flex = `${target.offsetWidth / target.offsetHeight} 1 0%`;
  };

  return (
    <div className={styles.mediasWrapper}>
      <div className={styles.images} ref={imageRef}>
        {[...Array(rowsCount)].map((row, index) => (
          <div className={styles.row}>
            {getImagesInRow(index).map((image) => (
              <Animated type={animatedType.imageZoom}>
                <img
                  src={image}
                  alt={image}
                  onLoad={handleOnLoad}
                />
              </Animated>
            ))}
          </div>
        ))}
      </div>
      {photoCaption && <div className={styles.photoCaption}>{photoCaption}</div>}
    </div>
  );
};

GalleryCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};
