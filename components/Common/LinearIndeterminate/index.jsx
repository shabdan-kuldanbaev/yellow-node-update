import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import LinearProgress from '@material-ui/core/LinearProgress';
import { selectIsPageReadyToDisplay } from 'redux/selectors/layout';
import { isMobile } from 'redux/selectors/client-side';
import styles from './styles.module.scss';

const LinearIndeterminate = () => {
  const linearRef = useRef();

  const isMobileResolution = useSelector(isMobile);
  const isPageReadyToDisplay = useSelector(selectIsPageReadyToDisplay);

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
        [styles.mobile]: isMobileResolution,
      })}
      ref={linearRef}
    >
      <LinearProgress variant="indeterminate" />
    </div>
  );
};

export default LinearIndeterminate;
