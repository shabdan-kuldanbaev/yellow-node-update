import PropTypes from 'prop-types';
import React from 'react';
import Swiper from 'react-id-swiper';
import get from 'lodash/get';
import { Animated } from 'components/Common/Animated';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { getSwiperParams } from '../utils';
import styles from './styles.module.scss';

export const RelatedServices = ({ services }) => {
  const swiperParams = getSwiperParams();

  return (
    <Animated {...REVEAL_ANIMATION_PROPS}>
      <Swiper {...swiperParams}>
        {services.map((service) => {
          const {
            title,
            images,
            contentModules,
          } = getDocumentFields(
            service,
            [
              'title',
              'images',
              'contentModules',
            ],
          );

          const imageUrl = getFileUrl(get(images, '[0]'));
          const buttonTitle = get(contentModules, '[0].fields.buttonTitle');
          const url = get(contentModules, '[0].fields.url');

          return (

            <div
              className={styles.service}
              key={`service/${title}`}
            >
              <img
                src={imageUrl}
                className={styles.image}
                alt="service page"
              />
              <div className={styles.cardContent}>
                <h3 className={styles.typeTitle}>
                  {title}
                </h3>
                <LinkWrapper
                  path={url}
                  className={styles.link}
                >
                  {buttonTitle}
                </LinkWrapper>
              </div>
            </div>

          );
        })}
      </Swiper>
    </Animated>
  );
};

RelatedServices.propTypes = {
  services: PropTypes.arrayOf(Object).isRequired,
};
