import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Zoom from 'react-medium-image-zoom';
import { selectIsMobileResolutions, selectIsTabletResolutions } from 'redux/selectors/layout';
import 'react-medium-image-zoom/dist/styles.css';

const ImageZoom = ({
  children,
  overlayBgColorEnd,
  transitionDuration,
  zoomMargin,
  isMobileResolution,
  isTabletResolutions,
}) => (
  <Zoom
    overlayBgColorEnd={overlayBgColorEnd}
    transitionDuration={transitionDuration}
    zoomMargin={(isMobileResolution && 20) || (isTabletResolutions && 50) || zoomMargin}
  >
    {children}
  </Zoom>
);

ImageZoom.defaultProps = {
  overlayBgColorEnd: 'rgba(255, 255, 255, 0.985)',
  transitionDuration: 300,
  zoomMargin: 200,
  isTabletResolutions: false,
};

ImageZoom.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  overlayBgColorEnd: PropTypes.string,
  transitionDuration: PropTypes.number,
  zoomMargin: PropTypes.number,
  isMobileResolution: PropTypes.bool.isRequired,
  isTabletResolutions: PropTypes.bool,
};

export default connect(
  (state) => ({
    isMobileResolution: selectIsMobileResolutions(state),
    isTabletResolutions: selectIsTabletResolutions(state),
  }),
)(ImageZoom);
