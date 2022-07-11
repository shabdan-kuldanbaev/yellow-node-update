import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import AddFooter from 'components/HomeCommon/AddFooter';
import styles from './styles.module.scss';

const Partners = dynamic(() => import('components/HomeCommon/Partners'));
const Duck = dynamic(() => import('components/HomeCommon/Duck'));

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
