import React from 'react';
import PropTypes from 'prop-types';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedContentfulImage,
} from 'utils/helper';
import { sizesOfImages } from '../utils/data';
import styles from './styles.module.scss';

export const MobileCarousel = ({ photos }) => (
  <section className={styles.gallerySection}>
    <div>
      {photos && photos.map((photoData, index) => {
        const { image, carouselImageType } = getDocumentFields(
          photoData,
          ['image', 'carouselImageType'],
        );
        const imageUrl = getOptimizedContentfulImage(
          getFileUrl(image),
          { width: sizesOfImages[`${carouselImageType}ImgMobile`] },
        );

        return (
          <div
            key={`photo/${index}`}
            className={styles[`${carouselImageType}Img`]}
          >
            <img
              style={{ backgroundImage: `url(${imageUrl})` }}
              alt=""
            />
          </div>
        );
      })}
    </div>
  </section>
);

MobileCarousel.propTypes = {
  photos: PropTypes.instanceOf(Array).isRequired,
};
