import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import { dataGallary } from './utils/data';
import styles from './styles.module.scss';
import { Arrow } from './Arrow';

export const PhotoGallery = ({ dataGallary: photos }) => {
  const [translate, setTranslate] = useState(0);
  const directionData = {
    left: 'left',
    right: 'right',
  };
  const galleryRef = useRef(null);
  const [isStop, setStope] = useState(true);
  const [direction, setDirection] = useState(null);

  const onDocumentMouseMove = (event) => {
    const leftBorder = window.innerWidth / 3;
    const rightBorder = window.innerWidth / 3 * 2;

    if ((leftBorder > event.clientX) || (event.clientX > rightBorder)) {
      // console.log(event.clientX);
      console.log(galleryRef);
    }
  };

  // (function () {
  //   let top = 0;
  //   const par = document.getElementById('par');
  //   var scroll = function () {
  //     top++;
  //     if (top >= par.firstElementChild.offsetHeight) {
  //       // first element is out of sight, so move to the end of the list
  //       top = 0;
  //       par.firstElementChild.style.marginTop = '';// reset to -
  //       par.appendChild(par.firstElementChild);
  //     } else {
  //       par.firstElementChild.style.marginTop = `-${top}px`;
  //     }
  //     setTimeout(scroll, 100);
  //   };
  //   scroll();
  // }());

  const handleOnClickArrowLeft = () => {
    // console.log('handleOnClickArrowLeft');
    // console.log('handleOnClickArrowLeft');
    galleryRef.current.style.transform = `translateX(${translate}px`;
    setTranslate(translate - 100);
  };

  const handleOnClickArrowRight = () => {
    // console.log('handleOnClickArrowRight');
    galleryRef.current.style.transform = `translateX(${translate}px`;
    setTranslate(translate + 100);
  };

  useEffect(() => {
    // let interval;
    // const onLoad = () => {
    // let interval = setInterval(() => {

      // console.log(galleryRef.firstElementChild);
      // const flavoursScrollWidth = galleryRef.current ? galleryRef.current.scrollWidth : 0;
      // const flavoursScrollLeft = galleryRef.current ? galleryRef.current.scrollWidth : 0;
      // console.log({ flavoursScrollWidth, flavoursScrollLeft });
      // if (flavoursScrollLeft !== flavoursScrollWidth) {
      //   galleryRef.current.scrollTo(flavoursScrollLeft + 1, 0);
      // }

    // }, 1000);
    // };

    // document.addEventListener('scroll', onLoad);
    return () => {
      // document.removeEventListener('scroll', onLoad);
      // clearInterval(interval);
    };
  }, []);

  return (
    <section className={styles.photoGallery}>
      <div ref={galleryRef} onMouseMove={onDocumentMouseMove}>
        {photos && photos.map((photo, index) => (
          <div key={`photo/${index}`} className={styles[photo.size]}>
            <img
              key={`photo/${index}`}
              className={styles[photo.size]}
              style={{ backgroundImage: `url(${photo.img})` }}
            />
          </div>
        ))}
      </div>
      <div className={styles.arrowBlockLeft} onClick={handleOnClickArrowLeft}>
        <Arrow />
      </div>
      <div className={styles.arrowBlockRight} onClick={handleOnClickArrowRight}>
        <Arrow />
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
