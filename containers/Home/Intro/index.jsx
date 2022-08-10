import React from 'react';
import PropTypes from 'prop-types';
import AddFooter from 'components/HomeCommon/AddFooter';
import Partners from 'components/HomeCommon/Partners';
import DuckContainer from 'components/HomeCommon/DuckContainer';
import styles from './styles.module.scss';

const Intro = ({
  theme,
  introSection,
}) => (
  <section
    ref={introSection}
    className={styles.intro}
  >
    <DuckContainer />
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
};

export default React.memo(Intro);
