import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectIsTabletResolutions } from 'redux/selectors/layout';
import { DesktopCarousel } from './DesktopCarousel';
import { MobileCarousel } from './MobileCarousel';
import { galleryData } from './utils/data';

const PhotoGallery = ({ galleryData: photos, isTabletResolutions }) => (
  isTabletResolutions
    ? <MobileCarousel photos={photos} />
    : <DesktopCarousel photos={photos} />
);

PhotoGallery.defaultProps = {
  galleryData,
};

PhotoGallery.propTypes = {
  galleryData: PropTypes.instanceOf(Array),
  isTabletResolutions: PropTypes.bool,
};

export default connect(
  (state) => ({ isTabletResolutions: selectIsTabletResolutions(state) }),
)(PhotoGallery);
