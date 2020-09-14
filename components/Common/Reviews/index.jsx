import React, {
  useRef,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import { animatedType } from 'utils/constants';
import { Comment } from './Comment';
import styles from './styles.module.scss';

export const Reviews = ({ reviews }) => {
  const [maxCardHeight, setMaxCardHeight] = useState(500);
  const swiperRef = useRef(null);
  const params = {
    slidesPerView: 1.2,
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,
  };

  useEffect(() => {
    const handleOnResize = () => {
      if (swiperRef && swiperRef.current) {
        const swiperWrapperChildren = swiperRef.current.children && swiperRef.current.children.length > 0 && swiperRef.current.children[0].children;
        if (swiperWrapperChildren && swiperWrapperChildren.length > 0) {
          const newIt = [...swiperWrapperChildren].reduce((previousValue, item) => (previousValue >= item.offsetHeight ? previousValue : item.offsetHeight), 0);
          if (newIt) {
            swiperRef.current.children[0].style.height = `${newIt}px`;
            setMaxCardHeight(newIt);
          }
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
            type: animatedType.isCustom,
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
            />
          );
        })}
      </div>
      <div className={styles.mobileReviews} style={{ height: `${maxCardHeight}` }}>
        <Swiper ref={swiperRef} {...params}>
          {reviews && reviews.map((comment) => (
            <div key={`mobileReviews/${comment.name}`}>
              <Comment comment={comment} animatioProps={{ type: animatedType.isCustom }} />
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
