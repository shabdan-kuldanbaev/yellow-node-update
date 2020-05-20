import React from 'react';
import PropTypes from 'prop-types';
import {
  AddFooter,
  Partners,
  Duck,
} from 'components';
import {
  selectIsModelLoaded,
  selectDuck,
  selectIsHomepageVisit,
} from 'redux/selectors/home';
import { selectIsMobileMenuOpened } from 'redux/selectors/layout';
import {
  setModelLoading,
  setScrollOfAddedFooter,
  setDuck,
  setHomepageVisit,
} from 'redux/actions/home';
import { connect } from 'react-redux';

const Intro = ({
  theme,
  introSection,
  isModelLoaded,
  isMobileMenuOpened,
  duck,
  isHomepageVisit,
  setModelLoading: setLoaded,
  setScrollOfAddedFooter: setScroll,
  setDuck: setDuckToRedux,
  setHomepageVisit: setVisitOfHomepage,
}) => (
  <section ref={introSection}>
    <Duck
      handleOnLoaded={setLoaded}
      isModelLoaded={isModelLoaded}
      setDuckToRedux={setDuckToRedux}
      duck={duck}
      setVisitOfHomepage={setVisitOfHomepage}
      isHomepageVisit={isHomepageVisit}
    />
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
  duck: selectDuck(state),
  isHomepageVisit: selectIsHomepageVisit(state),
});

export default connect(mapStateToProps, {
  setModelLoading,
  setScrollOfAddedFooter,
  setDuck,
  setHomepageVisit,
})(Intro);
