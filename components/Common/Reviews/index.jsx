import React, {
  useRef,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Swiper from 'react-id-swiper';
import SwiperCors, { EffectCoverflow } from 'swiper';
import { ANIMATED_TYPE } from 'utils/constants';
import { Comment } from './Comment';
import styles from './styles.module.scss';

SwiperCors.use([EffectCoverflow]);

export const Reviews = ({ reviews }) => {
  const [maxCardHeight, setMaxCardHeight] = useState(500);
  const swiperRef = useRef(null);
  const infoRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const params = {
    effect: 'coverflow',
    slidesPerView: 1.2,
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,
    coverflowEffect: {
      rotate: 0,
      stretch: -30,
      depth: 110,
      modifier: 1,
      slideShadows: false,
    },
    breakpoints: {
      480: {
        coverflowEffect: {
          stretch: -45,
        },
      },
    },
  };

  useEffect(() => {
    const handleOnResize = () => {
      if (swiperRef && swiperRef.current) {
        const swiperWrapperChildren = get(swiperRef, 'current.children[0].children', []);
        if (swiperWrapperChildren && swiperWrapperChildren.length > 0) {
          const newIt = [...swiperWrapperChildren].reduce((previousValue, item) => (previousValue >= item.offsetHeight ? previousValue : item.offsetHeight), 0);
          if (newIt) {
            swiperRef.current.children[0].style.height = `${newIt}px`;
            setMaxCardHeight(newIt);
          }
        }
      }

      const isInfoRefsExsists = infoRefs.reduce((previousValue, infoRef) => !!(get(infoRef, 'current.children[0]', [])), false);

      if (isInfoRefsExsists) {
        const newHeight = infoRefs.reduce((previousValue, infoRef) => (previousValue >= infoRef.current.children[0].offsetHeight ? previousValue : infoRef.current.children[0].offsetHeight), 0);
        if (newHeight) {
          infoRefs.forEach((infoRef) => {
            infoRef.current.style.height = `${newHeight}px`;
          });
        }
      }
    };

    handleOnResize();
    window.addEventListener('resize', handleOnResize);

    return () => window.removeEventListener('resize', handleOnResize);
  }, []);

  return (
    <div className={styles.reviews}>
      <div className={styles.desctopReviews}>
        {reviews && reviews.map((comment, index) => {
          const delay = 100 + 150 * index;
          const animatioProps = {
            type: ANIMATED_TYPE.isCustom,
            translateY: '2.82352941em',
            opasityDuration: 1,
            transformDuration: 1,
            transitionDelay: delay,
          };

          return (
            <Comment
              key={`desctopReviews/${comment.name}`}
              comment={comment}
              animatioProps={animatioProps}
              infoRef={infoRefs[index]}
            />
          );
        })}
      </div>
      <div className={styles.mobileReviews} style={{ height: `${maxCardHeight}` }}>
        <Swiper ref={swiperRef} {...params}>
          {reviews && reviews.map((comment) => (
            <div key={`mobileReviews/${comment.name}`}>
              <Comment comment={comment} animatioProps={{ type: ANIMATED_TYPE.isCustom, translateY: '0px' }} />
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.instanceOf(Array).isRequired,
};
