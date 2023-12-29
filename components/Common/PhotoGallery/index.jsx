import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { selectIsMobile, selectIsTablet } from 'store/selectors/layout';
import { getDocumentFields } from 'utils/helper';

const DesktopCarousel = dynamic(() => import('./DesktopCarousel'), { ssr: false });
const MobileCarousel = dynamic(() => import('./MobileCarousel'), { ssr: false });

const PhotoGallery = ({ sectionData }) => {
  const { contentModules } = getDocumentFields(sectionData);

  const isMobileResolution = useSelector(selectIsMobile);
  const isTabletResolutions = useSelector(selectIsTablet);

  if (contentModules && (isTabletResolutions || isMobileResolution)) {
    return <MobileCarousel photos={contentModules} />;
  }

  return <DesktopCarousel photos={contentModules} />;
};

PhotoGallery.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
};

export default PhotoGallery;
