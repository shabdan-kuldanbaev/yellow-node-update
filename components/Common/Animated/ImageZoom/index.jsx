import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Zoom from 'react-medium-image-zoom';
import { isMobile, isTablet } from 'redux/selectors/client-side';
import 'react-medium-image-zoom/dist/styles.css';

const ImageZoom = ({
  children,
  overlayBgColorEnd,
  transitionDuration,
  zoomMargin,
}) => {
  const isMobileResolution = useSelector(isMobile);
  const isTabletResolutions = useSelector(isTablet);

  return (
    <Zoom
      overlayBgColorEnd={overlayBgColorEnd}
      transitionDuration={transitionDuration}
      zoomMargin={(isMobileResolution && 20) || (isTabletResolutions && 50) || zoomMargin}
    >
      {children}
    </Zoom>
  );
};

ImageZoom.defaultProps = {
  overlayBgColorEnd: 'rgba(255, 255, 255, 0.985)',
  transitionDuration: 300,
  zoomMargin: 200,
};

ImageZoom.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  overlayBgColorEnd: PropTypes.string,
  transitionDuration: PropTypes.number,
  zoomMargin: PropTypes.number,
};

export default ImageZoom;
