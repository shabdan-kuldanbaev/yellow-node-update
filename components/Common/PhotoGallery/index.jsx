import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { isMobile, isTablet } from 'redux/selectors/layout';
import { getDocumentFields } from 'utils/helper';

const DesktopCarousel = dynamic(() => import('./DesktopCarousel'), { ssr: false });
const MobileCarousel = dynamic(() => import('./MobileCarousel'), { ssr: false });

const PhotoGallery = ({ sectionData }) => {
  const { contentModules } = getDocumentFields(sectionData);

  const isMobileResolution = useSelector(isMobile);
  const isTabletResolutions = useSelector(isTablet);

  if (contentModules && (isTabletResolutions || isMobileResolution)) {
    return <MobileCarousel photos={contentModules} />;
  }

  return <DesktopCarousel photos={contentModules} />;
};

PhotoGallery.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
};

export default PhotoGallery;
