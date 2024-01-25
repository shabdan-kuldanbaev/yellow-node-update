import { useEffect, useRef } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { selectIsPageReadyToDisplay, selectIsMobile } from 'redux/selectors/layout';
import styles from './styles.module.scss';

const LinearIndeterminate = () => {
  const linearRef = useRef();

  const isMobileResolution = useSelector(selectIsMobile);
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
