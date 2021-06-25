import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import SwiperCore, { Scrollbar } from 'swiper/core';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Animated } from 'components/Common/Animated';
import { SectionTitle } from 'components/CustomChatAppCommon/SectionTitle';
import { ANIMATED_TYPE } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

SwiperCore.use([Scrollbar]);

export const ChatFeaturesSection = ({ sectionData }) => {
  const {
    title,
    description,
    contentModules: chatFeatures,
  } = getDocumentFields(
    sectionData,
    [
      'title',
      'description',
      'contentModules',
    ],
  );
  const params = {
    slidesPerView: 1,
    spaceBetween: 150,
    slidesPerGroup: 1,
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    breakpoints: {
      1025: {
        slidesPerGroup: 2,
        slidesPerView: 2,
      },
    },
  };

  if (!chatFeatures || !chatFeatures.length) {
    return null;
  }

  return (
    <div className={styles.chatFeaturesSectionConteiner}>
      <div className={styles.chatFeaturesSection}>
        <SectionTitle
          title={title}
          description={description}
        />
        <div className={styles.chatFeaturesList}>
          <Animated
            type={ANIMATED_TYPE.isCustom}
            translateY="2.82352941em"
            opasityDuration={1}
            transformDuration={1}
            transitionDelay={750}
          >
            <Swiper {...params}>
              {chatFeatures.map((feature) => {
                const {
                  title: featureTitle,
                  description: featureDescription,
                } = getDocumentFields(
                  feature,
                  [
                    'title',
                    'description',
                  ],
                );

                return (
                  <div className={styles.item}>
                    <p className={styles.featureTitle}>
                      {featureTitle}
                    </p>
                    <p className={styles.featureSubtitle}>
                      {featureDescription}
                    </p>
                  </div>
                );
              })}
            </Swiper>
          </Animated>
        </div>
      </div>
    </div>
  );
};

ChatFeaturesSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
};
