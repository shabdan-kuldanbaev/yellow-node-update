import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import cn from 'classnames';
import { selectIsPageReadyToDisplay, selectIsMobileResolutions } from 'redux/selectors/layout';
import styles from './styles.module.scss';

const LinearIndeterminate = ({ isPageReadyToDisplay, isMobileResolutuins }) => {
  const linearRef = useRef();

  useEffect(() => {
    if (linearRef.current) {
      if (isPageReadyToDisplay) {
        linearRef.current.classList.remove(styles.show, styles.setDisplay);
      } else {
        linearRef.current.classList.add(styles.show, styles.setDisplay);
      }
    }
  }, [isPageReadyToDisplay]);

  return (
    <div
      className={cn(styles.linear, {
        [styles.mobile]: isMobileResolutuins,
      })}
      ref={linearRef}
    >
      <LinearProgress variant="indeterminate" />
    </div>
  );
};

LinearIndeterminate.propTypes = {
  isPageReadyToDisplay: PropTypes.bool.isRequired,
  isMobileResolutuins: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    isPageReadyToDisplay: selectIsPageReadyToDisplay(state),
    isMobileResolutuins: selectIsMobileResolutions(state),
  }),
)(LinearIndeterminate);
