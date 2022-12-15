import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { SwiperSlide } from 'swiper/react';
import CustomSwiper from 'UI/containers/CustomSwiper';
import ItemPreview from 'UI/components/ItemPreview';
import CallToAction from 'UI/components/CallToAction';
import SectionTitle from 'UI/components/SectionTitle';
import { useGallerySection } from './utils/useGallerySection';
import { swiperGalleryParams } from './utils/helpers';
import styles from './styles.module.scss';

const GallerySection = (props) => {
  const {
    type,
    title,
    description,
    slides,
    link,
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
        <CustomSwiper
          swiperParams={swiperGalleryParams}
          className={styles.slider}
          isShowNavigation
          navigationClassName={styles.navigation}
        >
          {slides?.map((slide, i) => (
            <SwiperSlide key={`gallery-section/${i}`}>
              <ItemPreview
                data={slide}
                type={type}
              />
            </SwiperSlide>
          ))}
        </CustomSwiper>
      </div>
      {link && (
        <CallToAction
          type="card"
          title={link.title}
          buttonTitle={link.buttonTitle}
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
