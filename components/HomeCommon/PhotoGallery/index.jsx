import React, { useState, useEffect } from 'react';
import { tabletResolution } from 'utils/helper';
import PropTypes from 'prop-types';
import { DesktopCarousel } from './DesktopCarousel';
import { MobileCarousel } from './MobileCarousel';
import { galleryData } from './utils/data';

export const PhotoGallery = ({ galleryData: photos }) => {
  const [isMobileResolution, setMobileResolution] = useState(false);

  useEffect(() => {
    const onResize = () => (
      window.innerWidth <= tabletResolution || window.innerHeight < 450
        ? setMobileResolution(true)
        : setMobileResolution(false)
    );

    onResize();

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [isMobileResolution]);

  return isMobileResolution
    ? <MobileCarousel photos={photos} />
    : <DesktopCarousel photos={photos} />;
};

PhotoGallery.defaultProps = {
  galleryData,
};

PhotoGallery.propTypes = {
  galleryData: PropTypes.instanceOf(Array),
};
