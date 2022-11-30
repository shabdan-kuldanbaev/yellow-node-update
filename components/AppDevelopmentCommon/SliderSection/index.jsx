import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Scrollbar, Mousewheel } from 'swiper';
import Animated from 'components/Common/Animated';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import SectionTitle from 'UI/components/SectionTitle';
import { getDocumentFields } from 'utils/helper';
import { getSliderProps } from './utils/sliderHelper';
import styles from './styles.module.scss';

SwiperCore.use([
  Scrollbar,
  Mousewheel,
]);

const SliderSection = ({ sectionData, type }) => {
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
          titleStyle={styles.titleStyle}
        />
        <div className={styles.sliderList}>
          <Animated
            {...animationProps}
            transitionDelay={300}
          >
            <Swiper
              {...params}
              scrollbar={{ draggable: true }}
            >
              {slides.map((slide) => {
                const {
                  title: slideTitle,
                  description: slideDescription,
                  text,
                } = getDocumentFields(
                  slide,
                  [
                    'title',
                    'description',
                    'text',
                  ],
                );

                return (
                  <SwiperSlide
                    className={styles.item}
                    key={`slides/${slideTitle}`}
                  >
                    <p className={styles.slideTitle}>
                      {slideTitle}
                    </p>
                    <p className={styles.slideSubtitle}>
                      {slideDescription}
                    </p>
                    {text && <ContentfulParser document={text} />}
                  </SwiperSlide>
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

export default SliderSection;
