import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { Animated } from 'components/Common/Animated';
import { getFileUrl, getOptimizedImage } from 'utils/helper';
import { ANIMATION_CASE_STUDY_PROPS } from '../utils/data';
import styles from './styles.module.scss';

const Wireframe = ({
  data: {
    images,
  },
  type,
  isMobileResolution,
}) => {
  if (!images) {
    return null;
  }

  return images.map((image) => {
    const imageUrl = isMobileResolution
      ? getOptimizedImage(getFileUrl(image), 0, 400, 'png', 'png8')
      : getOptimizedImage(getFileUrl(image), 0, 812, 'png', 'png8');

    return (
      <Animated
        key={imageUrl}
        delay={100}
        {...ANIMATION_CASE_STUDY_PROPS}
      >
        <div className={styles[type]}>
          <div className={styles.animatedContainer}>
            <img
              className={styles.image}
              src={imageUrl}
              alt={imageUrl}
            />
          </div>
          <div className={styles.animatedContainer}>
            <img
              className={styles.image}
              src={imageUrl}
              alt={imageUrl}
            />
          </div>
        </div>
      </Animated>
    );
  });
};

Wireframe.prototype = {
  data: PropTypes.shape({
    images: PropTypes.instanceOf(Array).isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default connect(
  (state) => ({ isMobileResolution: selectIsMobileResolutions(state) }),
)(Wireframe);
