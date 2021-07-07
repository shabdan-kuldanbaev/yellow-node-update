import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { Animated } from 'components/Common/Animated';
import { getFileUrl, getOptimizedContentfulImage } from 'utils/helper';
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
    const imageUrl = getOptimizedContentfulImage(
      getFileUrl(image),
      {
        width: 0,
        height: isMobileResolution ? 400 : 812,
        fm: 'png',
        fl: 'png8',
      },
    );

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
