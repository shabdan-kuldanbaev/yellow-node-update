import React, { useEffect } from 'react';
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
  selectIsFirstHomepageVisit,
} from 'redux/selectors/home';
import { selectIsMobileMenuOpened } from 'redux/selectors/layout';
import {
  setModelLoading,
  setScrollOfAddedFooter,
  setDuck,
  setHomepageVisit,
  setFirstHomepageVisit,
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
  setFirstHomepageVisit: setFirstHomeVisit,
  isFirstHomepageVisit,
}) => {
  useEffect(() => () => {
    setVisitOfHomepage(true);

    if (!isFirstHomepageVisit) setFirstHomeVisit(true);
  }, []);

  return (
    <section ref={introSection}>
      <Duck
        handleOnLoaded={setLoaded}
        isModelLoaded={isModelLoaded}
        setDuckToRedux={setDuckToRedux}
        duck={duck}
        isHomepageVisit={isHomepageVisit}
      />
      <AddFooter
        theme={theme}
        isModelLoaded={isModelLoaded}
        setScroll={setScroll}
        isMobileMenuOpened={isMobileMenuOpened}
        isFirstHomepageVisit={isFirstHomepageVisit}
      />
      <Partners />
    </section>
  );
};

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
  setFirstHomepageVisit: PropTypes.func.isRequired,
  isFirstHomepageVisit: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isModelLoaded: selectIsModelLoaded(state),
  isMobileMenuOpened: selectIsMobileMenuOpened(state),
  duck: selectDuck(state),
  isHomepageVisit: selectIsHomepageVisit(state),
  isFirstHomepageVisit: selectIsFirstHomepageVisit(state),
});

export default connect(mapStateToProps, {
  setModelLoading,
  setScrollOfAddedFooter,
  setDuck,
  setHomepageVisit,
  setFirstHomepageVisit,
})(Intro);
