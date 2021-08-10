import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import SwiperCore, {
  Pagination,
  EffectCoverflow,
  Mousewheel,
} from 'swiper/core';
import { CallToAction } from 'components/Common/CallToAction';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import 'swiper/components/pagination/pagination.scss';
import { ItemPreview } from './ItemPreview';
import { getGalleryProps } from './utils/galleryHelper';
import styles from './styles.module.scss';

SwiperCore.use([EffectCoverflow, Pagination, Mousewheel]);

export const GallerySection = ({
  sectionData,
  type,
  handleOnCTAClick,
}) => {
  const {
    title,
    slides,
    link: {
      linkTitle,
      buttonTitle,
    },
  } = getGalleryProps(sectionData);
  const params = {
    effect: 'coverflow',
    slidesPerView: 1.3,
    centeredSlides: true,
    loop: true,
    passiveListeners: true,
    mousewheel: {
      forceToAxis: true,
    },
    pagination: {
      el: '.swiper-pagination',
    },
    coverflowEffect: {
      rotate: 0,
      stretch: -40,
      depth: 150,
      slideShadows: false,
    },
    breakpoints: {
      1025: {
        slidesPerView: 1.8,
        spaceBetween: 0,
        coverflowEffect: {
          rotate: 0,
          stretch: -100,
          depth: 150,
        },
      },
    },
  };

  return (
    <section className={styles[type]}>
      <div className={styles.gallerySection}>
        <SectionTitle
          title={title}
        />
        <Swiper {...params}>
          {slides && slides.map((slide) => (
            <div>
              <ItemPreview
                data={slide}
                type={type}
              />
            </div>
          ))}
        </Swiper>
      </div>
      {linkTitle && buttonTitle && (
        <CallToAction
          type="card"
          title={linkTitle}
          buttonTitle={buttonTitle}
          className={styles.cta}
          handleOnClick={handleOnCTAClick}
        />
      )}
    </section>
  );
};

GallerySection.defaultProps = {
  handleOnCTAClick: () => {},
};

GallerySection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  handleOnCTAClick: PropTypes.func,
};
