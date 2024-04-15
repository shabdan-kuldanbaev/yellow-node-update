'use client';

import Lottie from 'react-lottie-light';
import { useLoadingScreen } from './utils/useLoadingScreen';
import styles from './styles.module.scss';

const LoadingScreen = (props) => {
  const {
    loadRef,
    defaultOptions,
  } = useLoadingScreen(props);

  return (
    <div
      ref={loadRef}
      className={styles.loadingPage}
    >
      <div className={styles.jsonWrapper}>
        <Lottie
          options={defaultOptions}
          speed={1}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
