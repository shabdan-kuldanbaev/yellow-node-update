import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Swiper from 'react-id-swiper';
import SwiperCors, { EffectCoverflow } from 'swiper';
import { ANIMATED_TYPE } from 'utils/constants';
import { Comment } from './Comment';
import styles from './styles.module.scss';
import { getGroupReducer } from '../utils/reviewsHelper';

SwiperCors.use([EffectCoverflow]);

// TODO rewrite component without js logic for resize
export const Reviews = ({ reviews }) => {
  const [maxCardHeight, setMaxCardHeight] = useState(500);
  const [desktopReviews, setDesktopReviews] = useState([]);
  const swiperRef = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);

  const infoRefs = useMemo(
    () => [ref1, ref2, ref3, ref4, ref5, ref6],
    [ref1, ref2, ref3, ref4, ref5, ref6],
  );

  const params = {
    effect: 'coverflow',
    slidesPerView: 1.2,
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,
    passiveListeners: true,
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

      const isInfoRefsExists = infoRefs.reduce((previousValue, infoRef) => !!(get(infoRef, 'current.children[0]', [])).length, false);

      if (isInfoRefsExists) {
        const newHeight = infoRefs.reduce((previousValue, infoRef) => (
          previousValue >= infoRef.current.children[0].offsetHeight
            ? previousValue
            : infoRef.current.children[0].offsetHeight
        ), 0);

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
  }, [infoRefs]);

  useEffect(() => {
    if (!reviews) return;

    const groupReducer = getGroupReducer(3);

    const groupedReviews = reviews.reduce(groupReducer, [[]]);

    setDesktopReviews(groupedReviews);
  }, [reviews]);

  return (
    <div className={styles.reviews}>
      <div className={styles.desktopReviews}>
        <Swiper
          {...params}
          slidesPerView={3}
          // slidesPerGroup={3}
          spaceBetween={40}
          effect="slide"
          centeredSlides={false}

        >
          {
            reviews.map((comment, index) => {
              const delay = 100 + 150 * index;
              const animationProps = {
                type: ANIMATED_TYPE.isCustom,
                translateY: '2.82352941em',
                opacityDuration: 1,
                transformDuration: 1,
                transitionDelay: delay,
              };

              return (
                <div key={`desktopReviews/${comment.name}`}>
                  <Comment
                    comment={comment}
                    animatioProps={animationProps}
                    infoRef={infoRefs[index]}
                  />
                </div>
              );
            })
          }
        </Swiper>
      </div>
      <div
        className={styles.mobileReviews}
        style={{ height: `${maxCardHeight}` }}
      >
        <Swiper
          ref={swiperRef}
          {...params}
        >
          {reviews && reviews.map((comment) => (
            <div key={`mobileReviews/${comment.name}`}>
              <Comment
                comment={comment}
                animatioProps={{
                  type: ANIMATED_TYPE.isCustom,
                  translateY: '0px',
                }}
              />
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
