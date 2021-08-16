import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import SwiperCore, { Scrollbar, Mousewheel } from 'swiper/core';
import { Animated } from 'components/Common/Animated';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { getDocumentFields } from 'utils/helper';
import { getSliderProps } from './utils/sliderHelper';
import styles from './styles.module.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

SwiperCore.use([
  Scrollbar,
  Mousewheel,
]);

export const SliderSection = ({ sectionData, type }) => {
  const {
    title,
    description,
    slides,
    animationProps,
    params,
  } = getSliderProps(sectionData);

  if (!slides || !slides.length) {
    return null;
  }

  return (
    <section className={styles[type]}>
      <div className={styles.sliderSection}>
        <SectionTitle
          title={title}
          description={description}
        />
        <div className={styles.sliderList}>
          <Animated
            {...animationProps}
            transitionDelay={750}
          >
            <Swiper {...params}>
              {slides.map((slide) => {
                const {
                  title: slideTitle,
                  description: slideDescription,
                } = getDocumentFields(
                  slide,
                  ['title', 'description'],
                );

                return (
                  <div
                    className={styles.item}
                    key={`slides/${slideTitle}`}
                  >
                    <p className={styles.slideTitle}>
                      {slideTitle}
                    </p>
                    <p className={styles.slideSubtitle}>
                      {slideDescription}
                    </p>
                  </div>
                );
              })}
            </Swiper>
          </Animated>
        </div>
      </div>
    </section>
  );
};

SliderSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};
