import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { SwiperNavigation } from 'components/SwiperNavigation';
import { ItemPreview } from 'UI/Molecules/ItemPreview';
import { GalleryCallToAction } from './GalleryCallToAction';
import { getGalleryProps } from './utils/galleryHelper';
import styles from './styles.module.scss';

const GallerySection = ({
  sectionData,
  type,
  handleOnCTAClick,
}) => {
  const {
    title,
    description,
    slides,
    linkData,
    params,
  } = getGalleryProps(sectionData);

  return (
    <section className={styles[type]}>
      <div className={styles.gallerySection}>
        <SectionTitle
          title={title}
          description={description}
          className={styles.sectionTitle}
        />
        <Swiper {...params}>
          {slides?.map((slide, i) => (
            <SwiperSlide key={`gallery-section/${i}`}>
              <ItemPreview
                data={slide}
                type={type}
              />
            </SwiperSlide>
          ))}
          {/* TODO: replace with refactored one */}
          <SwiperNavigation className={styles.navigation} />
        </Swiper>
      </div>
      {linkData && (
        <GalleryCallToAction
          slug={type}
          linkData={linkData}
          handleOnCTAClick={handleOnCTAClick}
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
