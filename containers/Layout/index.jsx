import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

const Layout = ({
  children,
  theme,
  introSection,
}) => (
  <Fragment>
    <Header theme={theme} introSection={introSection} />
      {children}
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
