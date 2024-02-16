'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import CookiesNotification from 'components/Common/CookiesNotification';
import GAnalytic from 'components/Layout/GAnalytic';
import Header from 'UI/sections/Header';
import { useLayout } from './utils/useLayout';

const Footer = dynamic(() => import('UI/sections/Footer'));
const LoadingScreen = dynamic(() => import('UI/components/LoadingScreen'));

const Layout = (props) => {
  const {
    children,
    introSection,
    isDuckLoading,
  } = useLayout(props);

  return (
    <>
      {isDuckLoading && <LoadingScreen />}
      <CookiesNotification />
      <Header introSection={introSection} />
      {children}
      <Footer />
      <GAnalytic />
      {/* <VideoAsk /> */}
    </>
  );
};

Layout.defaultProps = {
  children: null,
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default memo(Layout);
