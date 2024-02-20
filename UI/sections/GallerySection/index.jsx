import PropTypes from 'prop-types';
import cn from 'classnames';
import { SwiperSlide } from 'swiper/react';
import dynamic from 'next/dynamic';
import CustomSwiper from 'UI/containers/CustomSwiper';
import SectionTitle from 'UI/components/SectionTitle';
import { useGallerySection } from './utils/useGallerySection';
import { swiperGalleryParams, typedSwiperParams } from './utils/helpers';
import styles from './styles.module.scss';

const ItemPreview = dynamic(() => import('UI/components/ItemPreview'));
const CallToAction = dynamic(() => import('UI/components/CallToAction'));

const GallerySection = (props) => {
  const {
    type,
    view,
    title,
    description,
    slides,
    handleOnCTAClick = () => {},
    ctaData,
  } = useGallerySection(props);

  return (
    <section className={cn(styles[type], styles.section, styles[view])}>
      <div className={styles.gallerySection}>
        <SectionTitle
          title={title}
          description={description}
          className={styles.sectionTitle}
        />
        <CustomSwiper
          swiperParams={typedSwiperParams[type] || swiperGalleryParams}
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
      {ctaData && (
        <CallToAction
          className={styles.callToAction}
          handleOnClick={handleOnCTAClick}
          data={ctaData}
        />
      )}
    </section>
  );
};

GallerySection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  handleOnCTAClick: PropTypes.func,
};

export default GallerySection;
