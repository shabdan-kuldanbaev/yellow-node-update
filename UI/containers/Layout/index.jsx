import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import CookiesNotification from 'components/Common/CookiesNotification';
import GAnalytic from 'components/Layout/GAnalytic';
import Header from 'UI/sections/Header';
import LoadingScreen from 'UI/components/LoadingScreen'
import { useLayout } from './utils/useLayout';

const Footer = dynamic(() => import('UI/sections/Footer'));

const Layout = (props) => {
  const {
    children,
    introSection,
    isDuckLoaded,
  } = useLayout(props);

  return (
    <>
      {isDuckLoaded && <LoadingScreen />}
      <CookiesNotification />
      <Header introSection={introSection} />
      {children}
      <Footer />
      <GAnalytic />
    </>
  );
};

Layout.defaultProps = {
  children: null,
};

Layout.propTypes = {
  children: PropTypes.node,
  introSection: PropTypes.instanceOf(Object).isRequired,
};

export default React.memo(Layout);
