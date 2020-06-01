import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { dataGallary } from './utils/data';
import styles from './styles.module.scss';
import { Arrow } from './Arrow';

// TODO This file will be deleted (only for showing markup)

let left = 0;

export const PhotoGallery = ({ dataGallary: photos }) => {
  const galleryRef = useRef(null);

  const onDocumentMouseMove = (event) => {
    const leftBorder = window.innerWidth / 3;
    const rightBorder = window.innerWidth / 3 * 2;

    if ((leftBorder > event.clientX) || (event.clientX > rightBorder)) {
      // TODO console.log(event.clientX);
    }
  };

  const handleOnClickArrowLeft = () => {};

  const handleOnClickArrowRight = () => {
    const scroll = () => {
      left += 1;

      // TODO console.log({
      //   offsetLeft: galleryRef.current.children[0].offsetLeft,
      //   scrollHeight: (-1 * galleryRef.current.children[0].scrollHeight) + (46 * 2),
      // });
      // if (galleryRef.current.children[0].offsetLeft <= (-1 * galleryRef.current.children[0].scrollHeight) + (46 * 2)) {
      if (galleryRef.current.children[0].offsetLeft <= -442) {
        left = 0;
        galleryRef.current.children[0].current.style.marginLeft = '';
        galleryRef && galleryRef.current.appendChild(galleryRef.current.children[0]);
      } else {
        galleryRef && (galleryRef.current.children[0].style.marginLeft = `-${left}px`);
      }
      // setTimeout(scroll, 30);
    };
    scroll();
  };

  return (
    <section className={styles.photoGallery}>
      <div ref={galleryRef} onMouseMove={onDocumentMouseMove}>
        {photos && photos.map((photo, index) => (
          <div key={`photo/${index}`} className={styles[photo.size]}>
            <img style={{ backgroundImage: `url(${photo.img})` }} src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
          </div>
        ))}
      </div>
      <div className={styles.arrowBlockLeft} onClick={handleOnClickArrowLeft}>
        <Arrow position="left" />
      </div>
      <div className={styles.arrowBlockRight} onClick={handleOnClickArrowRight}>
        <Arrow position="right" />
      </div>
    </section>
  );
};

PhotoGallery.defaultProps = {
  dataGallary,
};

PhotoGallery.propTypes = {
  dataGallary: PropTypes.instanceOf(Array),
};
