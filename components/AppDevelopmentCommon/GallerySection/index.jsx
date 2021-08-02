import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import SwiperCore, {
  Pagination,
  EffectCoverflow,
  Mousewheel,
} from 'swiper/core';
import { FullLayout } from 'components/Layout/FullLayout';
import { SectionTitle } from 'components/CustomChatAppCommon/SectionTitle';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import 'swiper/components/pagination/pagination.scss';
import styles from './styles.module.scss';

SwiperCore.use([EffectCoverflow, Pagination, Mousewheel]);

export const GallerySection = ({ sectionData }) => {
  const {
    title,
    description,
    images,
  } = getDocumentFields(
    sectionData,
    [
      'title',
      'description',
      'images',
    ],
  );
  const params = {
    effect: 'coverflow',
    slidesPerView: 1.4,
    spaceBetween: 10,
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
      modifier: 1,
      slideShadows: false,
    },
    breakpoints: {
      1025: {
        slidesPerView: 1.8,
        spaceBetween: 80,
        coverflowEffect: {
          rotate: 0,
          stretch: -40,
          depth: 150,
        },
      },
    },
  };

  return (
    <FullLayout
      disableMaxWidth
      disableTopPadding
      disableSidePadding
      disableBottomPadding
    >
      <div className={styles.ourWorkSection}>
        <SectionTitle
          title={title}
          description={description}
        />
        <Swiper {...params}>
          {images.map((image) => {
            const imageUrl = getFileUrl(image);

            return (
              <div
                className={styles.item}
                key={`works/${imageUrl}`}
              >
                <img
                  src={imageUrl}
                  alt=""
                />
              </div>
            );
          })}
        </Swiper>
      </div>
    </FullLayout>
  );
};

GallerySection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
};
