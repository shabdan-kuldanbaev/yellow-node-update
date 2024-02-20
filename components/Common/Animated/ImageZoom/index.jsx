import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Zoom from 'react-medium-image-zoom';
import { selectIsMobileResolutions, selectIsTabletResolutions } from 'store/selectors/layout';
import 'react-medium-image-zoom/dist/styles.css';

const ImageZoom = ({
  children,
  overlayBgColorEnd = 'rgba(255, 255, 255, 0.985)',
  transitionDuration = 300,
  zoomMargin = 200,
}) => {
  const isMobileResolution = useSelector(selectIsMobileResolutions);
  const isTabletResolutions = useSelector(selectIsTabletResolutions);

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

ImageZoom.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  overlayBgColorEnd: PropTypes.string,
  transitionDuration: PropTypes.number,
  zoomMargin: PropTypes.number,
};

export default ImageZoom;
