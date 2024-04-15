'use client';

import { memo } from 'react';
import PropTypes from 'prop-types';
import AddFooter from 'components/HomeCommon/AddFooter';
import DuckContainer from 'UI/components/Duck/DuckContainer';
import styles from './styles.module.scss';

const HomeIntro = ({ introSection }) => (
  <section
    ref={introSection}
    className={styles.intro}
  >
    <DuckContainer />
    <AddFooter />
  </section>
);

HomeIntro.propTypes = {
  theme: PropTypes.string,
  introSection: PropTypes.instanceOf(Object).isRequired,
};

export default memo(HomeIntro);
