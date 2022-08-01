import React, {
  useRef,
  useEffect,
  useState,
  createRef,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCors, {
  EffectCoverflow,
  Navigation,
} from 'swiper';
import SwiperNavButton from 'components/SwiperNavButton';
import { ANIMATED_TYPE } from 'utils/constants';
import { getMaxVal } from 'utils/helper';
import { Comment } from './Comment';
import { getSwiperParams } from '../utils/reviewsHelper';
import styles from './styles.module.scss';

SwiperCors.use([EffectCoverflow, Navigation]);

// TODO rewrite component without js logic for resize
export const Reviews = ({ reviews = [] }) => {
  const [maxCardHeight, setMaxCardHeight] = useState(500);
  const swiperRef = useRef(null);
  const infoRefs = useRef(reviews.map(() => createRef()));
  const { desktopSwiperParams, mobileSwiperParams } = useMemo(() => getSwiperParams(), []);

  useEffect(() => {
    const handleOnResize = () => {
      if (swiperRef.current) {
        const swiperWrapperChildren = get(swiperRef, 'current.children[0].children', []);

        if (swiperWrapperChildren && swiperWrapperChildren.length > 0) {
          const newIt = [...swiperWrapperChildren].reduce((previousValue, item) => (
            previousValue >= item.offsetHeight
              ? previousValue
              : item.offsetHeight
          ), 0);

          if (newIt) {
            swiperRef.current.children[0].style.height = `${newIt}px`;
            setMaxCardHeight(newIt);
          }
        }
      }

      const isInfoRefsExists = infoRefs.current.reduce((previousValue, infoRef) => !!(get(infoRef, 'current', [])), false);

      if (isInfoRefsExists) {
        const newHeight = infoRefs.current.reduce((previousValue, ref) => getMaxVal(previousValue, ref.current.offsetHeight), 0);

        if (newHeight) {
          infoRefs.current.forEach((infoRef) => {
            infoRef.current.style.height = `${newHeight}px`;
          });
        }
      }
    };

    handleOnResize();
    window.addEventListener('resize', handleOnResize);

    return () => window.removeEventListener('resize', handleOnResize);
  }, [infoRefs]);

  const navPrev = useRef(null);
  const navNext = useRef(null);

  const swiperNavigation = {
    nextEl: navNext.current,
    prevEl: navPrev.current,
  };

  return (
    <div className={styles.reviews}>
      <div className={styles.desktopReviews}>
        <Swiper
          {...desktopSwiperParams}
          navigation={swiperNavigation}
        >
          {reviews.map((comment, index) => (
            <SwiperSlide key={`desktopReviews/${comment.name}`}>
              <Comment
                comment={comment}
                infoRef={infoRefs.current[index]}
              />
            </SwiperSlide>
          ))}

          <SwiperNavButton
            type="arrowLeft"
            text="previous"
            ref={navPrev}
          />
          <SwiperNavButton
            type="arrowRight"
            text="next"
            ref={navNext}
          />
        </Swiper>
      </div>
      <div
        className={styles.mobileReviews}
        style={{ height: `${maxCardHeight}` }}
      >
        <Swiper
          {...mobileSwiperParams}
          ref={swiperRef}
        >
          {reviews.map((comment) => (
            <SwiperSlide key={`mobileReviews/${comment.name}`}>
              <Comment
                comment={comment}
                animatioProps={{
                  type: ANIMATED_TYPE.isCustom,
                  translateY: '0px',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.instanceOf(Array).isRequired,
};
