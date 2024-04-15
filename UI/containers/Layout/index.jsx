'use client';

import PropTypes from 'prop-types';
import CookiesNotification from 'components/Common/CookiesNotification';
import GAnalytic from 'components/Layout/GAnalytic';
import Header from 'UI/sections/Header';
import Footer from 'UI/sections/Footer';
import { useLayout } from './utils/useLayout';

const Layout = (props) => {
  const {
    children,
    introSection,
    isDuckLoading,
  } = useLayout(props);

  return (
    <>
      {isDuckLoading}
      <CookiesNotification />
      <Header introSection={introSection} />
      {children}
      <Footer />
      <GAnalytic />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
