import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectIsFirstPageLoaded } from 'redux/selectors/layout';
import LoadingScreen from 'components/Common/LoadingScreen';
import { AppContext } from 'utils/appContext';
import styles from './styles.module.scss';

const LoadingPlaceholder = ({ isFirstPageLoaded }) => {
  const { contextData: { isFirstHomepageVisit } } = useContext(AppContext);

  return !isFirstHomepageVisit && !isFirstPageLoaded
    ? <LoadingScreen />
    : <div className={styles.placeholder} />;
};

LoadingPlaceholder.propTypes = {
  isFirstPageLoaded: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({ isFirstPageLoaded: selectIsFirstPageLoaded(state) }),
)(LoadingPlaceholder);
