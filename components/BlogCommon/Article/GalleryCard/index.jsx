import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Animated } from 'components';
import { animatedType, NUMBER_OF_IMAGES_PER_LINE } from 'utils/constants';
import styles from './styles.module.scss';

export const GalleryCard = ({ data: { data: images, photoCaption } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef(null);
  const rowsCount = Math.ceil(images.length / NUMBER_OF_IMAGES_PER_LINE);

  const getImagesInRow = useCallback(
    (row) => images.filter((image, index) => index >= row * NUMBER_OF_IMAGES_PER_LINE && index <= (row + 1) * NUMBER_OF_IMAGES_PER_LINE - 1),
    [images, rowsCount],
  );

  const handleOnLoad = () => {
    if (imageRef && imageRef.current) {
      const imagesChildren = imageRef.current.getElementsByTagName('img');
      if (imagesChildren && imagesChildren.length > 0) {
        const isImagesLoaded = Array.from(imagesChildren).reduce((previousValue, image) => (image.complete && image.height !== 0), false);
        setIsLoading(isImagesLoaded);
      }
    }
  };

  useEffect(() => {
    if (imageRef && imageRef.current) {
      const imagesChildren = get(imageRef, 'current.children', []);
      if (imagesChildren && imagesChildren.length > 0) {
        Array.from(imagesChildren).forEach((row) => {
          Array.from(row.children).forEach((image, index, array) => {
            if (array.length === 1) image.style.flex = '1 1 0%';
            else image.style.flex = `${image.offsetWidth / image.offsetHeight} 1 0%`;
          });
        });
      }
    }
  }, [isLoading]);

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
