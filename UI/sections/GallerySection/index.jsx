import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { SwiperNavigation } from 'UI/components/SwiperNavigation';
import ItemPreview from 'UI/components/ItemPreview';
import CallToAction from 'UI/components/CallToAction';
import { useGallerySection } from './utils/useGallerySection';
import { swiperGalleryParams } from './utils/helpers';
import styles from './styles.module.scss';

const GallerySection = (props) => {
  const {
    type,
    title,
    description,
    slides,
    linkData,
    linkTitle,
    buttonLinkTitle,
    handleOnCTAClick,
  } = useGallerySection(props);

  return (
    <section className={cn(styles[type], styles.section)}>
      <div className={styles.gallerySection}>
        <SectionTitle
          title={title}
          description={description}
          className={styles.sectionTitle}
        />
        <Swiper {...swiperGalleryParams}>
          {slides?.map((slide, i) => (
            <SwiperSlide key={`gallery-section/${i}`}>
              <ItemPreview
                data={slide}
                type={type}
              />
            </SwiperSlide>
          ))}
          <SwiperNavigation className={styles.navigation} />
        </Swiper>
      </div>
      {linkData && (
        <CallToAction
          type="card"
          title={linkTitle}
          buttonTitle={buttonLinkTitle}
          className={styles.callToAction}
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

export default GallerySection;
