import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import { setScrollOfAddedFooter } from 'redux/actions/home';
import { selectIsMobileMenuOpened } from 'redux/selectors/layout';
import { AddFooter } from 'components/HomeCommon/AddFooter';
import styles from './styles.module.scss';

const Partners = dynamic(() => import('components/HomeCommon/Partners'));
const Duck = dynamic(() => import('components/HomeCommon/Duck'));

const Intro = ({
  theme,
  introSection,
  isMobileMenuOpened,
  duck,
  isFirstHomepageVisit,
  setScrollOfAddedFooter: setScroll,
}) => (
  <section
    ref={introSection}
    className={styles.intro}
  >
    <Duck duck={duck} />
    <AddFooter theme={theme} />
    <Partners />
  </section>
);

Intro.defaultProps = {
  theme: 'dark',
};

Intro.propTypes = {
  theme: PropTypes.string,
  introSection: PropTypes.instanceOf(Object).isRequired,
  isMobileMenuOpened: PropTypes.bool.isRequired,
  setScrollOfAddedFooter: PropTypes.func.isRequired,
  duck: PropTypes.instanceOf(Object).isRequired,
  isFirstHomepageVisit: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({ isMobileMenuOpened: selectIsMobileMenuOpened(state) }),
  { setScrollOfAddedFooter },
)(Intro);
