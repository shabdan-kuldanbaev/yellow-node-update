import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export const MobileCarousel = ({ photos }) => (
  <section className={styles.gallerySection}>
    <div>
      {photos && photos.map((photo, index) => (
        <div key={`photo/${index}`} className={styles[photo.size]}>
          <img
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            style={{ backgroundImage: `url(${photo.img})` }}
            alt=""
          />
        </div>
      ))}
    </div>
  </section>
);

MobileCarousel.propTypes = {
  photos: PropTypes.instanceOf(Array).isRequired,
};
