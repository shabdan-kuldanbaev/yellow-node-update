import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'components';
import { selectIsModelLoaded, selectScrollOfAddedFooter } from 'redux/selectors/home';
import { setMobileMenuState } from 'redux/actions/layout';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const HeaderContainer = ({
  theme,
  introSection,
  isModelLoad: isModelLoaded,
  scrollOfAddedFooter: scrollLabel,
  setMobileMenuState: setMobileMenu
}) => (
  <Header
    theme={theme}
    introSection={introSection}
    scrollLabel={scrollLabel}
    isModelLoaded={isModelLoaded}
    setMobileMenuState={setMobileMenu}
  />
);

HeaderContainer.defaultProps = {
  theme: 'dark',
};

HeaderContainer.propTypes = {
  theme: PropTypes.string,
  introSection: PropTypes.instanceOf(Object).isRequired,
  isModelLoad: PropTypes.bool.isRequired,
  scrollOfAddedFooter: PropTypes.instanceOf(Object).isRequired,
  setMobileMenuState: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isModelLoad: selectIsModelLoaded(),
  scrollOfAddedFooter: selectScrollOfAddedFooter(),
});

export default connect(mapStateToProps, { setMobileMenuState })(HeaderContainer);
