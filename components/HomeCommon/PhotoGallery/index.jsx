import React, { useState, useEffect } from 'react';
import { tabletResolution } from 'utils/helper';
import PropTypes from 'prop-types';
import { DesktopCarousel } from './DesktopCarousel';
import { MobileCarousel } from './MobileCarousel';
import { gallaryData } from './utils/data';

export const PhotoGallery = ({ gallaryData: photos }) => {
  const [isMobileResolution, setMobileResolution] = useState(false);

  useEffect(() => {
    const setResize = () => (
      window.innerWidth <= tabletResolution || window.innerHeight < 450
        ? setMobileResolution(true)
        : setMobileResolution(false)
    );

    setResize();

    window.addEventListener('resize', setResize);

    return () => window.removeEventListener('resize', setResize);
  }, [isMobileResolution]);

  return isMobileResolution
    ? <MobileCarousel photos={photos} />
    : <DesktopCarousel photos={photos} />;
};

PhotoGallery.defaultProps = {
  gallaryData,
};

PhotoGallery.propTypes = {
  gallaryData: PropTypes.instanceOf(Array),
};
