import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  CookiesNotification,
  Loader,
} from 'components';
import Footer from './Footer';

const Layout = ({
  isLoading,
  children,
  theme,
  introSection,
}) => (
  <Fragment>
    <CookiesNotification />
    <Header theme={theme} introSection={introSection} />
    <Loader isLoading={isLoading}>
      {children}
    </Loader>
    <Footer theme={theme} />
  </Fragment>
);

Layout.defaultProps = {
  children: {},
};

Layout.propTypes = {
  children: PropTypes.instanceOf(Object),
  theme: PropTypes.string.isRequired,
  introSection: PropTypes.instanceOf(Object).isRequired,
};

export default Layout;
