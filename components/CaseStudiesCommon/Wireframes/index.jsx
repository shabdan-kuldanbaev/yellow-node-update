import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import CustomImage from 'components/Common/CustomImage';
import Animated from 'components/Common/Animated';
import { getImage } from 'utils/helper';
import { ANIMATION_CASE_STUDY_PROPS } from '../utils/data';
import styles from './styles.module.scss';
import { IMAGE_SIZES } from './config';

const Wireframe = ({
  data: {
    images,
  },
  type,
}) => {
  const isMobileResolution = useSelector(selectIsMobileResolutions);

  if (!images) {
    return null;
  }

  return images.map((image) => {
    const imageData = getImage(image);

    const height = isMobileResolution ? 400 : IMAGE_SIZES[type] || 500;

    const scaleCoefficient = height / imageData.height;
    const width = Math.trunc(imageData.width * scaleCoefficient);

    return (
      <Animated
        key={imageData.url}
        delay={100}
        {...ANIMATION_CASE_STUDY_PROPS}
      >
        <div className={styles[type]}>
          <CustomImage
            src={imageData.url}
            alt={imageData.url}
            layout="responsive"
            style={{
              minWidth: `${width}px`,
              height: `${height}px`,
            }}
            width={width}
            height={height}
            scale={2}
            containerClasses={styles.animatedContainer}
            className={styles.image}
          />
          <CustomImage
            src={imageData.url}
            alt={imageData.url}
            layout="responsive"
            style={{
              minWidth: `${width}px`,
              height: `${height}px`,
            }}
            width={width}
            height={height}
            scale={2}
            containerClasses={styles.animatedContainer}
            className={styles.image}
          />
        </div>
      </Animated>
    );
  });
};

Wireframe.propTypes = {
  data: PropTypes.shape({
    images: PropTypes.instanceOf(Array),
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default Wireframe;
