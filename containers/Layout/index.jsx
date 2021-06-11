import React, {
  Fragment,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { connect, useDispatch } from 'react-redux';
import {
  setMobileResolutions,
  setTabletResolutions,
  setFullResolution,
} from 'redux/actions/layout';
import { sendEmail } from 'redux/actions/contact';
import CookiesNotification from 'components/Common/CookiesNotification';
import { GAnalytic } from 'components/Layout/GAnalytic';
import Header from 'components/Layout/Header';
import { Footer } from 'components/Layout/Footer';
import FooterV2 from 'components/CaseStudiesCommon/Footer-v2';
import { FullScreenEstimation } from 'components/Common/FullScreenEstimation';
import {
  mobileResolution,
  tabletResolution,
  fullResolution,
} from 'utils/helper';

const Layout = ({
  children,
  theme,
  introSection,
  sendEmail: sendFeedback,
}) => {
  const dispatch = useDispatch();
  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);
  const { pathname } = useRouter();

  const openFullscreenEstimation = () => setIsFullscreenEstimation(true);
  const closeFullscreenEstimation = () => setIsFullscreenEstimation(false);
  // TODO
  // three repetitions in the code - handleOnClick
  // Remove this method from here. (rework it)
  // What does it throw as props for?
  // Why does not it do in the feedback form?
  const handleOnClick = (...args) => {
    const [
      fullName,
      email,
      description,
      selectedFilesInfo,
      projectBudget,
    ] = args;

    sendFeedback({
      name: fullName,
      email,
      description,
      attachments: selectedFilesInfo,
      projectBudget,
    });
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
  }, [dispatch]);

  return (
    <Fragment>
      <CookiesNotification />
      <Header
        theme={theme}
        introSection={introSection}
      />
      {children}
      { pathname === '/case-study/[project]' && (
        <FooterV2 />
      )}
      { pathname !== '/case-study/[project]' && (
        <Footer
          theme={theme}
          openFullscreenEstimation={openFullscreenEstimation}
        />
      )}
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

export default connect(null, { sendEmail })(Layout);
