import PropTypes from 'prop-types';
import cn from 'classnames';
import Illustration from 'UI/components/Illustration';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

const MobileCarousel = ({ photos, className }) => (
  <section className={cn(styles.gallerySection, className)}>
    <div>
      {photos?.map((photoData, index) => {
        const { image, carouselImageType } = getDocumentFields(
          photoData,
          ['image', 'carouselImageType'],
        );
        const imageUrl = getFileUrl(image);

        return (
          <Illustration
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
  className: PropTypes.string,
};

export default MobileCarousel;
