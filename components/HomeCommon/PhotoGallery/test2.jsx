import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { dataGallary, directionData } from './utils/data';
import styles from './styles.module.scss';

let offsetValue = 0;
let timer;

export const PhotoGallery = ({ dataGallary: photos }) => {
  const gallaty = photos.concat(photos, photos, photos);
  const [ulWidth, setUlWidth] = useState(0);
  const [side, setSide] = useState('');
  const galleryRef = useRef(null);
  const carouselRef = useRef(null);
  const [translate, setTranslate] = useState(0);

  const onMouseEnterRight = () => {
    // const translateX = galleryRef.current.getBoundingClientRect().left;
    // const translateX = carouselRef.current.getBoundingClientRect().left;
    if (carouselRef.current && ulWidth) {
      carouselRef.current.style.transform = `translate3d(${offsetValue}px, 0px, 0px)`;
      timer = setTimeout(function rightTimer() {
        offsetValue -= 1;
        carouselRef.current.style.transform = `translate3d(${offsetValue}px, 0px, 0px)`;
        if (offsetValue === ulWidth) offsetValue = 0;
        timer = setTimeout(rightTimer, 20);
      }, 20);
    }
  };

  const onMouseEnterLeft = () => {
    // const translateX = galleryRef.current.getBoundingClientRect().left;
    // const translateX = carouselRef.current.getBoundingClientRect().left;
    if (carouselRef.current && ulWidth) {
      carouselRef.current.style.transform = `translate3d(${offsetValue}px, 0px, 0px)`;
      timer = setTimeout(function rightTimer() {
        offsetValue += 1;
        carouselRef.current.style.transform = `translate3d(${offsetValue}px, 0px, 0px)`;
        if (offsetValue === 0) offsetValue = ulWidth;
        timer = setTimeout(rightTimer, 20);
      }, 20);
    }
  };

  const onMouseLeave = () => {
    // const translateX = galleryRef.current.getBoundingClientRect().left;
    // console.log(translateX);
    // if (isAnimationPlay) {
    // setAnimationPlay(false);
    clearTimeout(timer);
    // setTranslate(translateX);
    // if (translate !== -2898) setTranslate(translateX);
    // }
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

  // 100% { transform: translateX( ${translate}px); }
  // 100% { transform: translateX( -2898px); }
  const direction = side === directionData.right ? 'normal' : 'reverse';

  let toTranslate = ulWidth;

  // if (side !== '') {
  //   if (side === directionData.right) {

  //     if (translate) toTranslate = ulWidth;
  //     toTranslate = ulWidth + translate;

  //     // console.log('right', { translate, toTranslate });
  //   } else if (side === directionData.left) {

  //     toTranslate = translate + ulWidth;

  //     // console.log('left', { translate, toTranslate });
  //   }
  // }

  const scrolling = keyframes`
    0% { transform: translateX(${translate}px); }
    100% { transform: translateX(${toTranslate}px); }
  `;

  const Section = styled.section`
    position: relative;
    z-index: 1;
    // background-color: darkblue;
    // margin-top: 10vh;

    // &:before {
    //   content: '';
    //   position: absolute;
    //   width: calc(100% / 3);
    //   margin-left: calc(100% / 3);
    //   height: 100%;
    //   background-color: rgba(256, 256, 256, 0.5);
    //   top: 0;
    //   left: 0;
    //   z-index: 15;
    // }
  `;

  const MyDiv = styled.div`
    z-index: 10;
    width: ${ulWidth * 3};
    margin-left: ${(ulWidth * 3) / 2}px;
    position: relative;
    position: relative;
    will-change: transform;
    vertical-align: baseline;
    visibility: visible;

    &:hover {
      
      div {
        ul {
          // animation-play-state: running;
          // animation-direction: ${direction};
        }
      }
    }
  `;

  const UL = styled.ul`animation: ${scrolling} 5s linear infinite; animation-play-state: paused;`;

  return (
    <Section className={styles.photoGallery}>
      <div
        className={styles.left}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnterLeft}
      />
      <div
        className={styles.right}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnterRight}
      />
      <MyDiv ref={carouselRef}>
        <div className={styles.marquee}>
          <UL
            ref={galleryRef}
            className={styles.marqueeContent}
          >
            {gallaty && gallaty.map((photo) => (
              <li className={styles[photo.size]}>
                <img src={photo.img} alt="" />
              </li>
            ))}
          </UL>
        </div>
      </MyDiv>

    </Section>
  );
};

PhotoGallery.defaultProps = {
  dataGallary,
};

PhotoGallery.propTypes = {
  dataGallary: PropTypes.instanceOf(Array),
};



  // const onMouseMoveRight = (event) => {
  //   const translateX = galleryRef.current.getBoundingClientRect().left;
  //   if (!isAnimationPlay) {
  //     if (side !== directionData.right) {
  //       // setSide(directionData.right);
  //       // setTranslate(translateX);
  //     }
  //     setAnimationPlay(true);
  //   }
  // };


// const onMouseMove = (event) => {
//   const [leftBorder, rightBorder] = [window.innerWidth / 3, (window.innerWidth / 3) * 2];
//   const translateX = galleryRef.current.getBoundingClientRect().left;

//   if (!((leftBorder > event.clientX) || (event.clientX > rightBorder))) {
//     if (isAnimationPlay) {
//       if (translate !== -2898) setTranslate(translateX);
//       // console.log('stop, translateX', translateX);
//       setAnimationPlay(false);
//     }
//   }

//   if ((leftBorder > event.clientX) || (event.clientX > rightBorder)) {
//     console.log({ translateX });
//     if (!isAnimationPlay) {
//       // console.log('start');
//       // console.log({ translateX });
//       if (leftBorder > event.clientX) {
//         if (side !== directionData.left) {
//           setSide(directionData.left);
//           galleryRef.current.classList.add(styles.animationNormal);
//           // if (translate !== -2898) setTranslate(translateX);
//         }
//       }

//       if (event.clientX > rightBorder) {
//         if (side !== directionData.right) {
//           setSide(directionData.right);
//           galleryRef.current.classList.add(styles.animationReverse);
//           // if (translate !== -2898) setTranslate(translateX);
//         }
//       }
//     }

//     setAnimationPlay(true);
//   }
// };