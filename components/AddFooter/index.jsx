import React from 'react';
import PropTypes from 'prop-types';
import SocialIcons from '../SocialIcons';
import ScrollIcon from '../ScrollIcon';

import styles from './styles.module.scss';

const AddFooter = ({ theme }) => (
  <section className={styles.addFooterContainer}>
    <SocialIcons theme={theme} />
    <ScrollIcon theme={theme} />
    <span className={styles.scrollTitle}>scroll down</span>
  </section>
);

AddFooter.defaultProps = {
  theme: 'dark',
};

AddFooter.propTypes = {
  theme: PropTypes.string,
};

export default AddFooter;
