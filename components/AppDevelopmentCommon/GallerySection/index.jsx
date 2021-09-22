import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import SwiperCore, {
  Pagination,
  EffectCoverflow,
  Mousewheel,
} from 'swiper/core';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { getItemLink } from 'components/AppDevelopmentCommon/GallerySection/ItemPreview/utils/itemPreviewHelper';
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
        <Swiper {...params}>
          {slides && slides.map((slide) => {
            const link = getItemLink(slide);

            return (
              <div>
                {link
                  ? (
                    <LinkWrapper path={link}>
                      <ItemPreview
                        data={slide}
                        type={type}
                        isLocalLink
                      />
                    </LinkWrapper>
                  )
                  : (
                    <ItemPreview
                      data={slide}
                      type={type}
                    />
                  )}
              </div>
            );
          })}
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
