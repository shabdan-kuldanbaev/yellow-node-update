import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { SwiperNavigation } from 'components/SwiperNavigation';
import { ItemPreview } from './ItemPreview';
import { GalleryCallToAction } from './GalleryCallToAction';
import {
  getItemLink,
  getItemPreviewProps,
} from './ItemPreview/utils/itemPreviewHelper';
import { getGalleryProps } from './utils/galleryHelper';
import styles from './styles.module.scss';

const GallerySection = ({
  sectionData,
  type,
  handleOnCTAClick,
}) => {
  const router = useRouter();

  const {
    title,
    description,
    slides,
    linkData,
    params,
  } = getGalleryProps(sectionData);

  const navigateToLink = (link) => () => {
    router.push(link);
  };

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
            const link = getItemLink(slide);
            const { title: slideTitle } = getItemPreviewProps(slide);

            return (
              <SwiperSlide
                key={`gallery-section/${slideTitle}`}
                onClick={link && navigateToLink(link)}
              >
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
