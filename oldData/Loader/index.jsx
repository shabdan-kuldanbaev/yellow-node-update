import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const Loader = ({ children, isLoading }) => (!isLoading
  ? <div className={styles.preloader}>Yellow</div>
  : children
);

Loader.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
