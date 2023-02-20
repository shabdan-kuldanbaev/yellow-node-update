import React from 'react';
import PropTypes from 'prop-types';
import AddFooter from 'components/HomeCommon/AddFooter';
import DuckContainer from 'UI/components/Duck/DuckContainer';
import styles from './styles.module.scss';

const HomeIntro = ({
  theme,
  introSection,
}) => (
  <section
    ref={introSection}
    className={styles.intro}
  >
    <DuckContainer />
    <AddFooter theme={theme} />
  </section>
);

HomeIntro.defaultProps = {
  theme: 'dark',
};

HomeIntro.propTypes = {
  theme: PropTypes.string,
  introSection: PropTypes.instanceOf(Object).isRequired,
};

export default React.memo(HomeIntro);
