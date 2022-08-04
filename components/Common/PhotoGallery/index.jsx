import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { selectIsTabletResolutions, selectIsMobileResolutions } from 'redux/selectors/layout';

const DesktopCarousel = dynamic(() => import('./DesktopCarousel'));
const MobileCarousel = dynamic(() => import('./MobileCarousel'));

const PhotoGallery = ({
  photos,
}) => {
  const isTabletResolutions = useSelector(selectIsTabletResolutions);
  const isMobileResolution = useSelector(selectIsMobileResolutions);

  if (photos && (isTabletResolutions || isMobileResolution)) {
    return <MobileCarousel photos={photos} />;
  }

  return <DesktopCarousel photos={photos} />;
};

PhotoGallery.propTypes = {
  photos: PropTypes.instanceOf(Array).isRequired,
};

export default PhotoGallery;
