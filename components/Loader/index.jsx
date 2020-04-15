import React from 'react';
import PropTypes from 'prop-types';
import Spinner from './images/Spinner.svg';
import styles from './styles.module.scss';

const Loader = ({
  children,
  isLoading,
}) => (!isLoading
  ? (
    <div className={styles.preloader}>
      {/* TODO <img src={Spinner} alt="Loading..." /> */}
      <div
        src={Spinner}
        alt="Loading..."
        className={styles.loader}
      />
    </div>
  )
  : children
);

Loader.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
