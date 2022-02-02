import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import SwiperCore, {
  EffectCoverflow,
  Mousewheel,
  Pagination,
} from 'swiper/core';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { getItemLink, getItemPreviewProps } from 'components/AppDevelopmentCommon/GallerySection/ItemPreview/utils/itemPreviewHelper';
import { connect } from 'react-redux';
import { selectIsLoading } from 'redux/selectors/layout';
import { ItemPreview } from './ItemPreview';
import { GalleryCallToAction } from './GalleryCallToAction';
import { getGalleryProps } from './utils/galleryHelper';
import styles from './styles.module.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([
  EffectCoverflow,
  Pagination,
  Mousewheel,
]);

export const GallerySection = ({
  sectionData,
  type,
  handleOnCTAClick,
  pageLoading,
}) => {
  const {
    title,
    slides,
    linkData,
    params,
  } = getGalleryProps(sectionData);

  return (
    <section className={styles[type]}>
      <div className={styles.gallerySection}>
        <SectionTitle title={title} />
        {!pageLoading && (
          <Swiper {...params}>
            {slides && slides.map((slide) => {
              const link = getItemLink(slide);
              const { title: slideTitle } = getItemPreviewProps(slide);

              if (link) {
                return (
                  <div key={`gallery-section/${slideTitle}`}>
                    <LinkWrapper
                      path={link}
                      isLocalLink
                    >
                      <ItemPreview
                        data={slide}
                        type={type}
                      />
                    </LinkWrapper>
                  </div>
                );
              }

              return (
                <div key={`gallery-section/${slideTitle}`}>
                  <ItemPreview
                    data={slide}
                    type={type}
                  />
                </div>
              );
            })}
          </Swiper>
        )}
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
  pageLoading: false,
};

GallerySection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  handleOnCTAClick: PropTypes.func,
  pageLoading: PropTypes.bool,
};

export default connect(
  (state) => ({ pageLoading: selectIsLoading(state) }),
)(GallerySection);
