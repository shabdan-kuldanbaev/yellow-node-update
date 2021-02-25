import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { selectIsPageReadyToDisplay } from 'redux/selectors/layout';
import styles from './styles.module.scss';

const LinearIndeterminate = ({ isPageReadyToDisplay }) => {
  const linearRef = useRef();

  useEffect(() => {
    if (isPageReadyToDisplay && linearRef.current) {
      linearRef.current.classList.add(styles.hide, styles.setDisplay);
    } else {
      linearRef.current.classList.remove(styles.hide, styles.setDisplay);
    }
  }, [isPageReadyToDisplay]);

  return (
    <div className={styles.linear} ref={linearRef}>
      <LinearProgress variant="indeterminate" />
    </div>
  );
};

export default connect(
  (state) => ({ isPageReadyToDisplay: selectIsPageReadyToDisplay(state) }),
)(LinearIndeterminate);

LinearIndeterminate.propTypes = {
  isPageReadyToDisplay: PropTypes.bool.isRequired,
};
