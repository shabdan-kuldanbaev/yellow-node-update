import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setScrollOfAddedFooter } from 'redux/actions/home';
import { selectIsMobileMenuOpened } from 'redux/selectors/layout';
import {
  AddFooter,
  Partners,
  Duck,
} from 'components';
import { AppContext } from 'utils/appContext';
import styles from './styles.module.scss';

const Intro = ({
  theme,
  introSection,
  isMobileMenuOpened,
  duck,
  setScrollOfAddedFooter: setScroll,
}) => {
  const { contextData, setContextData } = useContext(AppContext);

  useEffect(() => () => {
    setContextData({
      ...contextData,
      isFirstHomepageVisit: true,
      isHomepageVisit: true,
    });
  }, []);

  return (
    <section ref={introSection} className={styles.intro}>
      <Duck duck={duck} />
      <AddFooter
        theme={theme}
        isModelLoaded={!!duck}
        setScroll={setScroll}
        isMobileMenuOpened={isMobileMenuOpened}
        isFirstHomepageVisit={contextData.isFirstHomepageVisit}
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
  duck: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({
    isMobileMenuOpened: selectIsMobileMenuOpened(state),
  }),
  { setScrollOfAddedFooter },
)(Intro);
