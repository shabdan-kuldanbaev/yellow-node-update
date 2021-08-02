import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import SwiperCore, { Scrollbar, Mousewheel } from 'swiper/core';
import { Animated } from 'components/Common/Animated';
import { FullLayout } from 'components/Layout/FullLayout';
import { SectionTitle } from 'components/CustomChatAppCommon/SectionTitle';
import { ANIMATED_TYPE } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import 'swiper/components/scrollbar/scrollbar.scss';
import styles from './styles.module.scss';

SwiperCore.use([Scrollbar, Mousewheel]);

export const SliderSection = ({ sectionData }) => {
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
  const animationProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };
  const params = {
    slidesPerView: 1,
    spaceBetween: 150,
    slidesPerGroup: 1,
    mousewheel: {
      forceToAxis: true,
    },
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
    <FullLayout
      disableMaxWidth
      disableTopPadding
      disableSidePadding
      disableBottomPadding
    >
      <div className={styles.chatFeaturesSectionConteiner}>
        <div className={styles.chatFeaturesSection}>
          <SectionTitle
            title={title}
            description={description}
          />
          <div className={styles.chatFeaturesList}>
            <Animated
              {...animationProps}
              transitionDelay={750}
            >
              <Swiper {...params}>
                {chatFeatures.map((feature) => {
                  const {
                    title: featureTitle,
                    description: featureDescription,
                  } = getDocumentFields(
                    feature,
                    ['title', 'description'],
                  );

                  return (
                    <div
                      className={styles.item}
                      key={`features/${featureTitle}`}
                    >
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
    </FullLayout>
  );
};

SliderSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
};
