import PropTypes from 'prop-types';
import React from 'react';
import { Swiper } from 'swiper/react';
import SwiperCore, { Mousewheel, Navigation } from 'swiper/core';
import Animated from 'components/Common/Animated';
import LinkWrapper from 'components/Common/LinkWrapper';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { getServiceParams, getSwiperParams } from '../utils';
import styles from './styles.module.scss';

SwiperCore.use([Mousewheel, Navigation]);

export const RelatedServices = ({ services }) => {
  if (!services) {
    return null;
  }

  const swiperParams = getSwiperParams();

  return (
    <Animated {...REVEAL_ANIMATION_PROPS}>
      <div className={styles.serviceList}>
        <Swiper {...swiperParams}>
          {services?.map((service) => {
            const {
              title,
              description,
              imageUrl,
              imageBgUrl,
              buttonTitle,
              serviceUrl,
            } = getServiceParams(service);

            return (
              <div
                className={styles.service}
                key={`service/${title}`}
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
                  <LinkWrapper
                    path={serviceUrl}
                    className={styles.link}
                  >
                    {buttonTitle}
                  </LinkWrapper>
                </div>
              </div>

            );
          })}
        </Swiper>
      </div>
    </Animated>
  );
};

RelatedServices.propTypes = {
  services: PropTypes.arrayOf(Object).isRequired,
};
