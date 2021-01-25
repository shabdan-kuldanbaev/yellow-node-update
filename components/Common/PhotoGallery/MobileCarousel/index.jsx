import React from 'react';
import PropTypes from 'prop-types';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedImage,
} from 'utils/helper';
import { sizesOfImages } from '../utils/data';
import styles from './styles.module.scss';

export const MobileCarousel = ({ photos }) => (
  <section className={styles.gallerySection}>
    <div>
      {photos && photos.map((photoData, index) => {
        const { photo, type } = getDocumentFields(photoData, ['photo', 'type']);
        const image = getOptimizedImage(getFileUrl(photo), sizesOfImages[`${type}Mobile`]);

        return (
          <div key={`photo/${index}`} className={styles[type]}>
            <img style={{ backgroundImage: `url(${image})` }} alt="" />
          </div>
        );
      })}
    </div>
  </section>
);

MobileCarousel.propTypes = {
  photos: PropTypes.instanceOf(Array).isRequired,
};
