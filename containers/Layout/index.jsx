import React, {
  Fragment,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { setBlogStatus, setFirstVisit } from 'redux/actions/blog';
import {
  setMobileResolutions,
  setTabletResolutions,
  setFullResolution,
} from 'redux/actions/layout';
import { sendEmail } from 'redux/actions/contact';
import {
  Header,
  Footer,
  CookiesNotification,
  FullScreenEstimation,
  GAnalytic,
} from 'components';
import {
  mobileResolution,
  tabletResolution,
  fullResolution,
} from 'utils/helper';

export const Layout = ({
  children,
  theme,
  introSection,
  sendEmail,
}) => {
  const dispatch = useDispatch();
  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);
  const openFullscreenEstimation = () => setIsFullscreenEstimation(true);
  const closeFullscreenEstimation = () => setIsFullscreenEstimation(false);

  const handleOnClick = (...args) => {
    const [
      fullName,
      email,
      projectDescription,
      selectedFiles,
      isSendNDAChecked,
      projectBudget,
    ] = args;
    sendEmail({
      fullName,
      email,
      projectDescription,
      selectedFiles,
      isSendNDAChecked,
      projectBudget,
    });
    closeFullscreenEstimation();
  };

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
  }, []);

  return (
    <Fragment>
      <CookiesNotification />
      <Header theme={theme} introSection={introSection} />
      {children}
      <Footer
        theme={theme}
        openFullscreenEstimation={openFullscreenEstimation}
      />
      <FullScreenEstimation
        isFullscreenEstimation={isFullscreenEstimation}
        closeFullscreenEstimation={closeFullscreenEstimation}
        handleOnClick={handleOnClick}
      />
      <GAnalytic />
    </Fragment>
  );
};

Layout.defaultProps = {
  children: {},
};

Layout.propTypes = {
  children: PropTypes.instanceOf(Object),
  theme: PropTypes.string.isRequired,
  introSection: PropTypes.instanceOf(Object).isRequired,
  sendEmail: PropTypes.func.isRequired,
};

export default connect(null, {
  setBlogStatus,
  setFirstVisit,
  sendEmail,
})(Layout);
