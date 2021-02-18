import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { selectIsPageReadyToDisplay } from 'redux/selectors/layout';
import LinearProgress from '@material-ui/core/LinearProgress';
import styles from './styles.module.scss';

const LinearIndeterminate = ({ IsPageReadyToDisplay }) => {
  const linearRef = useRef();

  useEffect(() => {
    if (IsPageReadyToDisplay) {
      linearRef.current && linearRef.current.classList.add(styles.hide, styles.setDisplay);
    } else {
      linearRef.current && linearRef.current.classList.remove(styles.hide, styles.setDisplay);
    }
  }, [IsPageReadyToDisplay]);

  return (
    <div className={styles.linear} ref={linearRef}>
      <LinearProgress variant="indeterminate" />
    </div>
  );
};

export default connect((state) => ({
  IsPageReadyToDisplay: selectIsPageReadyToDisplay(state),
}))(LinearIndeterminate);
