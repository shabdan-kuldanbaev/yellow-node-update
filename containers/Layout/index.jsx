import React, {
  Fragment,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  setMobileResolutions,
  setTabletResolutions,
  setFullResolution,
} from 'redux/actions/layout';
import CookiesNotification from 'components/Common/CookiesNotification';
import GAnalytic from 'components/Layout/GAnalytic';
import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import FullScreenEstimation from 'components/Common/FullScreenEstimation';
import {
  mobileResolution,
  tabletResolution,
  fullResolution,
} from 'utils/helper';

const Layout = ({ children, introSection }) => {
  const dispatch = useDispatch();
  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);

  const closeFullscreenEstimation = () => setIsFullscreenEstimation(false);

  useEffect(() => {
    const handleOnResize = () => {
      const { innerWidth } = window;

      if (innerWidth <= mobileResolution) dispatch(setMobileResolutions(true));
      else dispatch(setMobileResolutions(false));

      if (innerWidth > mobileResolution && innerWidth <= tabletResolution) dispatch(setTabletResolutions(true));
      else dispatch(setTabletResolutions(false));

      if (innerWidth > tabletResolution && innerWidth <= fullResolution) dispatch(setFullResolution(true));
      else dispatch(setFullResolution(false));
    };

    handleOnResize();
    window.addEventListener('resize', handleOnResize);

    return () => window.removeEventListener('resize', handleOnResize);
  }, [dispatch]);

  return (
    <Fragment>
      <CookiesNotification />
      <Header introSection={introSection} />
      {children}
      <Footer />
      <FullScreenEstimation
        isFullscreenEstimation={isFullscreenEstimation}
        closeFullscreenEstimation={closeFullscreenEstimation}
      />
      <GAnalytic />
      {/* TODO return it when issue with design will be resolved */}
      {/* <ToTopButton /> */}
    </Fragment>
  );
};

Layout.defaultProps = {
  children: {},
};

Layout.propTypes = {
  children: PropTypes.instanceOf(Object),
  introSection: PropTypes.instanceOf(Object).isRequired,
};

export default React.memo(Layout);
