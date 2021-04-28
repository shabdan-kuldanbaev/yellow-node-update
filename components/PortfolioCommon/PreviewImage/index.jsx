import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { Animated } from 'components';
import { getOptimizedImage } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const PreviewImage = ({ image, isMobileResolution }) => (
  <div className={styles.imgWrapper}>
    <Animated
      type={ANIMATED_TYPE.isCustom}
      translateY="2.82352941em"
      opasityDuration={0.8}
      transformDuration={0.8}
      transitionDelay={0}
    >
      <LazyLoadImage src={image} effect="blur" />
    </Animated>
  </div>
);

PreviewImage.propTypes = {
  image: PropTypes.string.isRequired,
  isMobileResolution: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({ isMobileResolution: selectIsMobileResolutions(state) }),
)(PreviewImage);
