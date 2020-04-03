import React from 'react';
import PropTypes from 'prop-types';
import {
  AddFooter,
  Partners,
  // TODO Duck,
} from 'components';
import { selectIsModelLoaded } from 'redux/selectors/home';
import { selectIsMobileMenuOpened } from 'redux/selectors/layout';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setModelLoading, setScrollOfAddedFooter } from 'redux/actions/home';

const Intro = ({
  theme,
  introSection,
  isModelLoad: isModelLoaded,
  setScrollOfAddedFooter: setScroll,
  setModelLoading: setLoaded,
  isMobileMenuOpened,
}) => (
  <section ref={introSection}>
    {/* TODO <Duck handleOnLoaded={setLoaded} /> */}
    <AddFooter
      theme={theme}
      isModelLoaded={isModelLoaded}
      setScroll={setScroll}
      isMobileMenuOpened={isMobileMenuOpened}
    />
    <Partners />
  </section>
);

Intro.defaultProps = {
  theme: 'dark',
};

Intro.propTypes = {
  theme: PropTypes.string,
  introSection: PropTypes.instanceOf(Object).isRequired,
  isModelLoad: PropTypes.bool.isRequired,
  setScrollOfAddedFooter: PropTypes.func.isRequired,
  setModelLoading: PropTypes.func.isRequired,
  isMobileMenuOpened: PropTypes.bool.isRequired,
};


const mapStateToProps = createStructuredSelector({
  isModelLoad: selectIsModelLoaded(),
  isMobileMenuOpened: selectIsMobileMenuOpened(),
});

export default connect(mapStateToProps, { setModelLoading, setScrollOfAddedFooter })(Intro);
