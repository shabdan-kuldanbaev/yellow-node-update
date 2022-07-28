import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import {
  getItemLink,
  getItemPreviewProps,
} from 'components/AppDevelopmentCommon/GallerySection/ItemPreview/utils/itemPreviewHelper';
import SwiperNavButton from 'components/SwiperNavButton';
import { ItemPreview } from './ItemPreview';
import { GalleryCallToAction } from './GalleryCallToAction';
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

  const navPrev = useRef(null);
  const navNext = useRef(null);

  const swiperNavigation = {
    nextEl: navNext.current,
    prevEl: navPrev.current,
  };

  return (
    <section className={styles[type]}>
      <div className={styles.gallerySection}>
        <SectionTitle
          title={title}
          description={description}
          className={styles.sectionTitle}
        />
        <Swiper
          {...params}
          navigation={swiperNavigation}
        >
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
          <SwiperNavButton
            type="arrowLeft"
            text="previous"
            className={styles.swiperPrevEl}
            ref={navPrev}
          />
          <SwiperNavButton
            type="arrowRight"
            text="next"
            className={styles.swiperNextEl}
            ref={navNext}
          />
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
