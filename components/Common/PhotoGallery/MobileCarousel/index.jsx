import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import CustomImage from 'components/Common/CustomImage';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

const MobileCarousel = ({ photos }) => (
  <section className={styles.gallerySection}>
    <div>
      {photos?.map((photoData, index) => {
        const { image, carouselImageType } = getDocumentFields(
          photoData,
          ['image', 'carouselImageType'],
        );
        const imageUrl = getFileUrl(image);

        return (
          <CustomImage
            key={`gallary/photo/${index}`}
            src={imageUrl}
            layout="responsive"
            width={600}
            height={350}
            containerClasses={cn(styles.imageContainer, styles[`${carouselImageType}Img`])}
          />
        );
      })}
    </div>
  </section>
);

MobileCarousel.propTypes = {
  photos: PropTypes.instanceOf(Array).isRequired,
};

export default MobileCarousel;
