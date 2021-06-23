import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import SwiperCore, { Scrollbar } from 'swiper/core';
import { SectionTitle } from 'components/CustomChatAppCommon/SectionTitle';
import { chatFeaturesData } from './utils/data';
import 'swiper/components/scrollbar/scrollbar.scss';
import styles from './styles.module.scss';

SwiperCore.use([Scrollbar]);

export const ChatFeaturesSection = ({ chatFeaturesData: chatFeatures }) => {
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

  return (
    <div className={styles.chatFeaturesSectionConteiner}>
      <div className={styles.chatFeaturesSection}>
        <SectionTitle
          title="Crucial chat application features"
          text="The list of required application features depends on your business goals.
            This is an essential part of the chat development process since other factors like costs, time,
            and technology stack will depend on it. Our team is ready to help you implement all of them."
        />
        <div className={styles.chatFeaturesList}>
          <Swiper
            {...params}
          >
            {chatFeatures.map((feature) => (
              <div className={styles.item}>
                <p className={styles.featureTitle}>
                  {feature.title}
                </p>
                <p className={styles.featureSubtitle}>
                  {feature.subtitle}
                </p>
              </div>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

ChatFeaturesSection.defaultProps = {
  chatFeaturesData,
};

ChatFeaturesSection.propTypes = {
  chatFeaturesData: PropTypes.instanceOf(Array),
};
