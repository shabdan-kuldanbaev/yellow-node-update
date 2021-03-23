import React, { useContext } from 'react';
import { LoadingScreen } from 'components';
import { AppContext } from 'utils/appContext';
import styles from './styles.module.scss';

const LoadingPlaceholder = () => {
  const { contextData: { isFirstHomepageVisit } } = useContext(AppContext);

  return (!isFirstHomepageVisit
    ? <LoadingScreen />
    : <div className={styles.placeholder} />);
};

export default LoadingPlaceholder;
