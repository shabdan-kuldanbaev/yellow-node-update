import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectIsTabletResolutions } from 'redux/selectors/layout';
import { DesktopCarousel } from './DesktopCarousel';
import { MobileCarousel } from './MobileCarousel';

const PhotoGallery = ({ photos, isTabletResolutions }) => (
  isTabletResolutions
    ? <MobileCarousel photos={photos} />
    : <DesktopCarousel photos={photos} />
);

PhotoGallery.defaultProps = {
  isTabletResolutions: false,
};

PhotoGallery.propTypes = {
  photos: PropTypes.instanceOf(Object).isRequired,
  isTabletResolutions: PropTypes.bool,
};

export default connect(
  (state) => ({ isTabletResolutions: selectIsTabletResolutions(state) }),
)(PhotoGallery);
