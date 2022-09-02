import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { SwiperNavigation } from 'components/SwiperNavigation';
import { ItemPreview } from './ItemPreview';
import { GalleryCallToAction } from './GalleryCallToAction';
import { getItemPreviewProps } from './ItemPreview/utils/itemPreviewHelper';
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
          {slides?.map((slide) => {
            const { title: slideTitle } = getItemPreviewProps(slide);

            return (
              <SwiperSlide key={`gallery-section/${slideTitle}`}>
                <ItemPreview
                  data={slide}
                  type={type}
                />
              </SwiperSlide>
            );
          })}
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
