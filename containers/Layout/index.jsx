import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Footer,
  CookiesNotification,
  Loader,
} from 'components';

export const Layout = ({
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
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.instanceOf(Object),
  theme: PropTypes.string.isRequired,
  introSection: PropTypes.instanceOf(Object).isRequired,
};
