import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export const DesktopCarousel = ({ photos }) => {
  const gallery = photos.concat(photos, photos, photos);
  const [fullListWidth, setFullListWidth] = useState(0);
  const [carouselContainerRef, listRef] = [useRef(null), useRef(null)];

  let offsetValue = 0;
  let timer;

  const handleOnMouseEnterRight = () => {
    if (carouselContainerRef.current && fullListWidth) {
      carouselContainerRef.current.style.transform = `translate3d(${offsetValue}px, 0px, 0px)`;
      timer = setInterval(() => {
        if (carouselContainerRef.current) {
          offsetValue -= 1;
          carouselContainerRef.current.style.transform = `translate3d(${offsetValue}px, 0px, 0px)`;
          if (offsetValue === fullListWidth) offsetValue = 0;
        }
      }, 2);
    }
  };

  const handleOnMouseEnterLeft = () => {
    if (carouselContainerRef.current && fullListWidth) {
      carouselContainerRef.current.style.transform = `translate3d(${offsetValue}px, 0px, 0px)`;
      timer = setInterval(() => {
        if (carouselContainerRef.current) {
          offsetValue += 1;
          carouselContainerRef.current.style.transform = `translate3d(${offsetValue}px, 0px, 0px)`;
          if (offsetValue === 0) offsetValue = fullListWidth;
        }
      }, 2);
    }
  };

  const handleOnMouseLeave = () => clearInterval(timer);

  useEffect(() => {
    if (listRef) {
      let sum = 0;
      for (let i = 0; i < photos.length; i += 1) {
        sum += listRef.current.children[i].offsetWidth;
      }
      const newSum = -1 * sum;

      setFullListWidth(newSum);
    }
  }, []);

  return (
    <section className={styles.gallerySection}>
      <div
        className={styles.leftSideToScroll}
        onMouseEnter={handleOnMouseEnterLeft}
        onMouseLeave={handleOnMouseLeave}
      />
      <div
        className={styles.rightSideToScroll}
        onMouseEnter={handleOnMouseEnterRight}
        onMouseLeave={handleOnMouseLeave}
      />
      <div
        ref={carouselContainerRef}
        className={styles.carouselContainer}
        style={{
          width: fullListWidth * 3,
          marginLeft: (fullListWidth * 3) / 2,
        }}
      >
        <div className={styles.listWrapper}>
          <ul ref={listRef} className={styles.unorderedList}>
            {gallery && gallery.map((photo, index) => (
              <li key={`gallary/photo/${index}`} className={styles[photo.size]}>
                <img src={photo.img} alt="" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

DesktopCarousel.propTypes = {
  photos: PropTypes.instanceOf(Array).isRequired,
};
