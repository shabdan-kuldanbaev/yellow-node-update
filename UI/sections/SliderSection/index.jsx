import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Scrollbar, Mousewheel } from 'swiper';
import Animated from 'components/Common/Animated';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import SectionTitle from 'UI/components/SectionTitle';
import classNames from 'classnames';
import CardContainer from 'UI/containers/CardContainer';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
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
    params,
  } = getSliderProps(sectionData);

  if (!slides || !slides.length) {
    return null;
  }

  return (
    <section className={classNames(styles.sliderSection, styles[type])}>
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          description={description}
          titleStyle={styles.titleStyle}
        />

        <CardContainer className={styles.sliderList}>
          <Animated
            {...REVEAL_ANIMATION_PROPS}
            transitionDelay={50}
          >
            <Swiper
              {...params}
              scrollbar={{ draggable: true }}
            >
              {slides.map(({ slideTitle, slideDescription, text }) => (
                <SwiperSlide
                  className={styles.item}
                  key={`slides/${slideTitle}`}
                >
                  <h3 className={styles.slideTitle}>
                    {slideTitle}
                  </h3>
                  <p className={styles.slideSubtitle}>
                    {slideDescription}
                  </p>
                  {text && <ContentfulParser document={text} />}
                </SwiperSlide>
              ))}
            </Swiper>
          </Animated>
        </CardContainer>
      </div>
    </section>
  );
};

SliderSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default SliderSection;
