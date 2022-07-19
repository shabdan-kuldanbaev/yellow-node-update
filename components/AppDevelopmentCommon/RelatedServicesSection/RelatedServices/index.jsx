import PropTypes from 'prop-types';
import React from 'react';
import Swiper from 'react-id-swiper';
import get from 'lodash/get';
import SwiperCore, { Mousewheel, Navigation } from 'swiper';
import { Animated } from 'components/Common/Animated';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { getSwiperParams } from '../utils';
import styles from './styles.module.scss';

SwiperCore.use([Mousewheel, Navigation]);

export const RelatedServices = ({ services }) => {
  const swiperParams = getSwiperParams();

  return (
    <Animated {...REVEAL_ANIMATION_PROPS}>
      <div className={styles.serviceList}>
        <Swiper {...swiperParams}>
          {services.map((service) => {
            const {
              title,
              images,
              contentModules,
              description,
              imagesBundles,
            } = getDocumentFields(
              service,
              [
                'title',
                'images',
                'contentModules',
                'description',
                'imagesBundles',
              ],
            );

            const imageUrl = getFileUrl(get(images, '[0]'));
            const imageBgUrls = getFileUrl(get(imagesBundles, '[0]'));
            const buttonTitle = get(contentModules, '[0].fields.buttonTitle');
            const serviceUrl = get(contentModules, '[0].fields.url');

            return (
              <div
                className={styles.service}
                key={`service/${title}`}
              >
                <div
                  className={styles.imageWrapper}
                  style={imageBgUrls ? { background: `url(${imageBgUrls})` } : undefined}
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
