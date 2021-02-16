import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectIsTabletResolutions, selectIsMobileResolutions } from 'redux/selectors/layout';
import { DesktopCarousel } from './DesktopCarousel';
import { MobileCarousel } from './MobileCarousel';

const PhotoGallery = ({
  photos,
  isTabletResolutions,
  isMobileResolution,
}) => (
  (isTabletResolutions || isMobileResolution)
    ? <MobileCarousel photos={photos} />
    : <DesktopCarousel photos={photos} />
);

PhotoGallery.defaultProps = {
  isTabletResolutions: false,
  isMobileResolution: false,
};

PhotoGallery.propTypes = {
  photos: PropTypes.instanceOf(Array).isRequired,
  isTabletResolutions: PropTypes.bool,
  isMobileResolution: PropTypes.bool,
};

export default connect(
  (state) => ({
    isTabletResolutions: selectIsTabletResolutions(state),
    isMobileResolution: selectIsMobileResolutions(state),
  }),
)(PhotoGallery);
