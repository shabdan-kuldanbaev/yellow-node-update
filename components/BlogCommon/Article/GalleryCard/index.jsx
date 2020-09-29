import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Animated } from 'components';
import { animatedType } from 'utils/constants';
import styles from './styles.module.scss';

export const GalleryCard = ({ data: { data: images, photoCaption } }) => {
  const [loading, setLoading] = useState(false);
  const imageRef = useRef(null);
  const imageCount = images.length;
  const rowsCount = Math.ceil(imageCount / 3);

  const getImagesInRow = useCallback(
    (row) => images.filter((item, index) => index >= row * (rowsCount + 1) && index <= row * rowsCount + 2),
    [images, rowsCount],
  );

  const calculateImageRatio = useCallback(
    (width, height) => width / height,
    [],
  );

  useEffect(() => {
    if (imageRef && imageRef.current) {
      const imagesChildren = imageRef.current.children && imageRef.current.children.length > 0 && imageRef.current.children;
      if (imagesChildren && imagesChildren.length > 0) {
        [...Array(...imagesChildren)].forEach((row) => {
          [...Array(...row.children)].forEach((image, index, array) => {
            if (array.length === 1) image.style.flex = '1 1 0%';
            else {
              const newRatio = calculateImageRatio(image.offsetWidth, image.offsetHeight);
              image.style.flex = `${newRatio} 1 0%`;
            }
          });
        });
      }
    }
  }, [loading]);

  return (
    <div className={styles.mediasWrapper}>
      <div className={styles.images} ref={imageRef}>
        {
          [...Array(rowsCount)].map((item, index) => {
            const imagesInRow = getImagesInRow(index);

            return (
              <div className={styles.row}>
                {
                  imagesInRow.map((image) => (
                    <Animated type={animatedType.imageZoom}>
                      <img src={image} alt={image} onLoad={() => setLoading(true)} />
                    </Animated>
                  ))
                }
              </div>
            );
          })
        }
      </div>
      {photoCaption && <div className={styles.photoCaption}>{photoCaption}</div>}
    </div>
  );
};
