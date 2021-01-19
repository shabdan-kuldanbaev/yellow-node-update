import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import styles from './styles.module.scss';

export const MobileCarousel = ({ galleryData }) => {
  const photos = get(galleryData, 'items[0].fields.photos', []);
  return (
    <section className={styles.gallerySection}>
      <div>
        {photos.length && photos.map((photo, index) => {
          const image = get(photo, 'fields.photo.fields.file.url', '');
          const size = get(photo, 'fields.type', '');

          return (
            <div key={`photo/${index}`} className={styles[size]}>
              <img
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                style={{ backgroundImage: `url(${image})` }}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

MobileCarousel.propTypes = {
  galleryData: PropTypes.instanceOf(Array).isRequired,
};
