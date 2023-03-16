import PropTypes from 'prop-types';
import Lottie from 'react-lottie-light';
import { connect } from 'react-redux';
import { setFirstPageLoaded } from 'redux/actions/layout';
import { selectIsPageReadyToDisplay, selectIsFirstPageLoaded } from 'redux/selectors/layout';
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

LoadingScreen.propTypes = {
  isPageReadyToDisplay: PropTypes.bool.isRequired,
  isFirstPageLoaded: PropTypes.bool.isRequired,
  setFirstPageLoaded: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    isPageReadyToDisplay: selectIsPageReadyToDisplay(state),
    isFirstPageLoaded: selectIsFirstPageLoaded(state),
  }),
  { setFirstPageLoaded },
)(LoadingScreen);
