import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setScrollOfAddedFooter,
  setDuck,
  setHomepageVisit,
  setFirstHomepageVisit,
} from 'redux/actions/home';
import {
  selectDuck,
  selectIsHomepageVisit,
  selectIsFirstHomepageVisit,
} from 'redux/selectors/home';
import { selectIsMobileMenuOpened } from 'redux/selectors/layout';
import {
  AddFooter,
  Partners,
  Duck,
} from 'components';
import styles from './styles.module.scss';

const Intro = ({
  theme,
  introSection,
  isMobileMenuOpened,
  duck,
  isHomepageVisit,
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
    <section ref={introSection} className={styles.intro}>
      <Duck
        duck={duck}
        setDuckToRedux={setDuckToRedux}
        isHomepageVisit={isHomepageVisit}
      />
      <AddFooter
        theme={theme}
        isModelLoaded={!!duck}
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
  isMobileMenuOpened: PropTypes.bool.isRequired,
  setScrollOfAddedFooter: PropTypes.func.isRequired,
  setFirstHomepageVisit: PropTypes.func.isRequired,
  isFirstHomepageVisit: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    isMobileMenuOpened: selectIsMobileMenuOpened(state),
    duck: selectDuck(state),
    isHomepageVisit: selectIsHomepageVisit(state),
    isFirstHomepageVisit: selectIsFirstHomepageVisit(state),
  }), {
    setScrollOfAddedFooter,
    setDuck,
    setHomepageVisit,
    setFirstHomepageVisit,
  },
)(Intro);
