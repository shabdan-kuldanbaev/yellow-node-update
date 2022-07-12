import React from 'react';
import PropTypes from 'prop-types';
import AddFooter from 'components/HomeCommon/AddFooter';
import Partners from 'components/HomeCommon/Partners';
import Duck from 'components/HomeCommon/Duck';
import styles from './styles.module.scss';

const Intro = ({
  theme,
  introSection,
  duck,
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
  duck: PropTypes.instanceOf(Object).isRequired,
};

export default Intro;
