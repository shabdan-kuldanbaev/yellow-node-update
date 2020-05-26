import React, { useState, useEffect, useRef, Suspense } from 'react';
import PropTypes, { array } from 'prop-types';
import { connectAdvanced } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { dataGallary } from './utils/data';
import styles from './styles.module.scss';
import { Arrow } from './Arrow';

export const PhotoGallery = ({ dataGallary: photos }) => {
  const newP = [...photos, ...photos, ...photos];
  const [translate, setTranslate] = useState(0);
  const [ulWidth, setUlWidth] = useState(0);
  const [side, setSide] = useState('');
  const directionData = {
    left: 'left',
    right: 'right',
  };
  const galleryRef = useRef(null);

  // 100% { transform: translateX( ${translate}px); }
  // 100% { transform: translateX( -2898px); }

  const scrollingMinus = keyframes`
    0% { transform: translateX(${translate}px); }
    100% { transform: translateX(${ulWidth - translate}px); }
  `;

  const scrollingPlus = keyframes`
    0% { transform: translateX(${translate}px); }
    100% { transform: translateX(${translate + ulWidth}px); }
    `;

  const animationName = side === directionData.right ? scrollingMinus : scrollingPlus;

  const UL = styled.ul`animation: ${animationName} 5s linear infinite;`;


  const onDocumentMouseMove = (event) => {
    const leftBorder = window.innerWidth / 3;
    const rightBorder = (window.innerWidth / 3) * 2;
    // console.log('df');
    if ((leftBorder > event.clientX) || (event.clientX > rightBorder)) {
      // console.log(leftBorder, event.clientX, event.clientX, rightBorder);
      const translateX = galleryRef.current.getBoundingClientRect().left;
      console.log({ translateX });

      galleryRef.current.classList.remove(styles.onMiddle);

      if (leftBorder > event.clientX) {
        // galleryRef.current.classList.add(styles.onHoverLeft);

        if (side !== directionData.left) {
          // console.log('-', side);
          // console.log({translate});
          if (translate !== -2898) setTranslate(translateX);
          setSide(directionData.left);
        }
      }

      if (event.clientX > rightBorder) {
        // const aN = animationStyles(true, translateX);
        if (side !== directionData.right) {
          // console.log('-', side);
          setTranslate(translateX);
          if (translate !== -2898) setTranslate(translateX);
          setSide(directionData.right);
        }
      }
      // if (leftBorder > event.clientX) {
      //   galleryRef.current.classList.add(styles.onHoverLeft);
      // } else galleryRef.current.classList.remove(styles.onHoverLeft);

      // if (event.clientX > rightBorder) {
      //   galleryRef.current.classList.add(styles.onHoverRight);
      // } else galleryRef.current.classList.remove(styles.onHoverRight);
    } else {
      // galleryRef.current.classList.remove(styles.onHoverLeft);
      // galleryRef.current.classList.remove(styles.onHoverRight);

      // galleryRef.current.classList.add(styles.onMiddle);
    }
  };

  useEffect(() => {
    if (galleryRef) {
      let sum = 0;
      for (let i = 0; i < photos.length; i += 1) {
        sum += galleryRef.current.children[i].offsetWidth;
      }
      const newSum = -1 * sum;

      setUlWidth(newSum);
    }
  }, []);

  const style = {
    // animationName,
    // animationTimingFunction: 'linear',
    // animationDuration: '5s',
    // animationIterationCount: 'infinite',
  };
  return (
    <section className={styles.photoGallery}>
      <div
        className={styles.marquee}
        onMouseMove={onDocumentMouseMove}
      >
        <UL
          className={styles.marqueeContent}
          ref={galleryRef}
          style={style}
          // onMouseMove={onDocumentMouseMove}
        >
          {newP && newP.map((photo, index) => (
            <li className={styles[photo.size]}><img src={photo.img} alt="" /></li>
          ))}
        </UL>
      </div>
      {/* <div className={styles.arrowBlockLeft} onClick={handleOnClickArrowLeft}>
        <Arrow position="left" />
      </div>
      <div className={styles.arrowBlockRight} onClick={handleOnClickArrowRight}>
        <Arrow position="right" />
      </div> */}
    </section>
  );
};

PhotoGallery.defaultProps = {
  dataGallary,
};

PhotoGallery.propTypes = {
  dataGallary: PropTypes.instanceOf(Array),
};
