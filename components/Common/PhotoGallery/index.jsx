import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { selectIsMobile, selectIsTablet } from 'redux/selectors/layout';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

const DesktopCarousel = dynamic(() => import('./DesktopCarousel'), { ssr: false });
const MobileCarousel = dynamic(() => import('./MobileCarousel'), { ssr: false });

const PhotoGallery = ({ sectionData, type }) => {
  const { contentModules } = getDocumentFields(sectionData, ['contentModules']);

  const isMobileResolution = useSelector(selectIsMobile);
  const isTabletResolutions = useSelector(selectIsTablet);

  if (contentModules && (isTabletResolutions || isMobileResolution)) {
    return (
      <MobileCarousel
        photos={contentModules}
        className={styles[type]}
      />
    );
  }

  return (
    <DesktopCarousel
      photos={contentModules}
      className={styles[type]}
    />
  );
};

PhotoGallery.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
};

export default PhotoGallery;
