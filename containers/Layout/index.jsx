import React, {
  Fragment,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setBlogStatus, setFirstVisit } from 'redux/actions/blog';
import {
  setMobileResolutions,
  setTabletResolutions,
  setPageLoading,
  setFullResolution,
} from 'redux/actions/layout';
import { sendEmail } from 'redux/actions/contact';
import { getSubscriber } from 'redux/actions/subscribe';
import { selectIsBlogOpen } from 'redux/selectors/blog';
import {
  Header,
  Footer,
  CookiesNotification,
  PageLoading,
  FullScreenEstimation,
  GAnalytic,
} from 'components';
import {
  mobileResolution,
  tabletResolution,
  fullResolution,
} from 'utils/helper';

export const Layout = ({
  isLoading,
  children,
  theme,
  introSection,
  isBlogOpen,
  setBlogStatus: setBlogCurrentStatus,
  setFirstVisit: setFirstVisitOfBlog,
  sendEmail,
  getSubscriber,
}) => {
  const { asPath } = useRouter();
  const dispatch = useDispatch();
  const [isBlogLoaded, setBlogLoaded] = useState(false);
  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);
  const handleOnBlogLoad = () => setBlogLoaded(true);
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
    const id = localStorage.getItem('unique_id');

    getSubscriber(id);
  }, [asPath]);

  useEffect(() => {
    dispatch(setPageLoading(isLoading));
  }, [isLoading]);

  useEffect(() => {
    const isBlogPage = asPath.includes('blog');

    if (!isBlogPage && isBlogOpen) {
      setBlogCurrentStatus(false);
      setFirstVisitOfBlog(false);
    } else if (!isBlogPage) setBlogLoaded(false);
    else if (isBlogPage && !isBlogOpen) setBlogCurrentStatus(true);
  }, [asPath]);

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
      {!isBlogLoaded && (
        <PageLoading
          isLoading={isLoading}
          isBlogOpen={isBlogOpen}
          handleOnBlogLoad={handleOnBlogLoad}
          asPath={asPath}
        />
      )}
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
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.instanceOf(Object),
  theme: PropTypes.string.isRequired,
  introSection: PropTypes.instanceOf(Object).isRequired,
  isBlogOpen: PropTypes.bool.isRequired,
  setBlogStatus: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
  getSubscriber: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({ isBlogOpen: selectIsBlogOpen(state) }),
  {
    setBlogStatus,
    setFirstVisit,
    sendEmail,
    getSubscriber,
  },
)(Layout);
