import React from 'react';
import PropTypes from 'proptypes';
import styles from './styles.module.scss';

const SectionTitle = ({ title, subtitle }) => (
  <div className={styles.titleContainer}>
    <h1>{title}</h1>
    {subtitle && <span>{subtitle}</span>}
  </div>
);

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default SectionTitle;
