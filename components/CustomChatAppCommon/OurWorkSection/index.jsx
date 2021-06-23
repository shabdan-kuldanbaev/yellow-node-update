import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import SwiperCore, { Pagination, EffectCoverflow } from 'swiper/core';
import { SectionTitle } from 'components/CustomChatAppCommon/SectionTitle';
import { worksData } from './utils/data';
import 'swiper/components/pagination/pagination.scss';
import styles from './styles.module.scss';

SwiperCore.use([EffectCoverflow, Pagination]);

export const OurWorkSection = ({ worksData: works }) => {
  const params = {
    effect: 'coverflow',
    slidesPerView: 1.8,
    spaceBetween: 80,
    centeredSlides: true,
    loop: true,
    passiveListeners: true,
    pagination: {
      el: '.swiper-pagination',
    },
    coverflowEffect: {
      rotate: 0,
      stretch: -40,
      depth: 150,
      modifier: 1,
      slideShadows: false,
    },
  };

  return (
    <div className={styles.ourWorkSection}>
      <SectionTitle
        title="Our work"
        text="Our team combines the vast experience and proactive approach to software development"
      />
      <Swiper
        {...params}
      >
        {works.map((work) => (
          <div className={styles.item}>
            <img
              src={work}
              alt=""
              style={{ width: '100%', borderRadius: '5px' }}
            />
          </div>
        ))}
      </Swiper>
    </div>
  );
};

OurWorkSection.defaultProps = {
  worksData,
};

OurWorkSection.propTypes = {
  worksData: PropTypes.instanceOf(Array),
};
