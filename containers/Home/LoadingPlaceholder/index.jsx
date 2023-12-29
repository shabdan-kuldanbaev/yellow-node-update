import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectIsFirstPageLoaded } from 'store/selectors/layout';
import LoadingScreen from 'UI/components/LoadingScreen';
import { AppContext } from 'utils/appContext';
import styles from './styles.module.scss';

const LoadingPlaceholder = () => {
  const isFirstPageLoaded = useSelector(selectIsFirstPageLoaded);
  const { contextData: { isFirstHomepageVisit } } = useContext(AppContext);

  return !isFirstHomepageVisit && !isFirstPageLoaded
    ? <LoadingScreen />
    : <div className={styles.placeholder} />;
};

export default LoadingPlaceholder;
