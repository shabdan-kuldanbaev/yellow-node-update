import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel, Navigation } from 'swiper/core';
import Animated from 'components/Common/Animated';
import LinkWrapper from 'components/Common/LinkWrapper';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import SwiperNavButton from 'components/SwiperNavButton';
import { getServiceParams, getSwiperParams } from '../utils';
import styles from './styles.module.scss';

SwiperCore.use([Mousewheel, Navigation]);

export const RelatedServices = ({ services }) => {
  const navPrev = useRef(null);
  const navNext = useRef(null);

  if (!services) {
    return null;
  }

  const swiperParams = getSwiperParams();

  const swiperNavigation = {
    nextEl: navNext.current,
    prevEl: navPrev.current,
  };

  return (
    <Animated {...REVEAL_ANIMATION_PROPS}>
      <div className={styles.serviceList}>
        <Swiper
          {...swiperParams}
          navigation={swiperNavigation}
        >
          {services.map((service) => {
            const {
              title,
              description,
              imageUrl,
              imageBgUrl,
              buttonTitle,
              serviceUrl,
            } = getServiceParams(service);

            return (
              <SwiperSlide>
                <LinkWrapper
                  path={serviceUrl}
                  className={styles.service}
                >
                  <div
                    className={styles.imageWrapper}
                    style={imageBgUrl ? { background: `url(${imageBgUrl})` } : undefined}
                  >
                    <img
                      src={imageUrl}
                      className={styles.image}
                      alt="service page"
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.typeTitle}>
                      {title}
                    </h3>
                    {description && <p>{description}</p>}
                    <span className={styles.readMore}>
                      {buttonTitle}
                    </span>
                  </div>
                </LinkWrapper>
              </SwiperSlide>
            );
          })}
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
    </Animated>
  );
};

RelatedServices.propTypes = {
  services: PropTypes.arrayOf(Object).isRequired,
};
