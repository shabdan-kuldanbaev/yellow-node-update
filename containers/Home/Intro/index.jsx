import React from 'react';
import PropTypes from 'prop-types';
import {
  AddFooter,
  Partners,
  Duck,
} from 'components';
import { selectIsModelLoaded } from 'redux/selectors/home';
import { selectIsMobileMenuOpened } from 'redux/selectors/layout';
import { setModelLoading, setScrollOfAddedFooter } from 'redux/actions/home';
import { connect } from 'react-redux';

const Intro = ({
  theme,
  introSection,
  isModelLoaded,
  isMobileMenuOpened,
  setModelLoading: setLoaded,
  setScrollOfAddedFooter: setScroll,
}) => (
  <section ref={introSection}>
    <Duck handleOnLoaded={setLoaded} />
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
  isModelLoaded: PropTypes.bool.isRequired,
  isMobileMenuOpened: PropTypes.bool.isRequired,
  setModelLoading: PropTypes.func.isRequired,
  setScrollOfAddedFooter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isModelLoaded: selectIsModelLoaded(state),
  isMobileMenuOpened: selectIsMobileMenuOpened(state),
});

export default connect(mapStateToProps, { setModelLoading, setScrollOfAddedFooter })(Intro);
