import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectIsFirstHomepageVisit } from 'redux/selectors/home';
import { LoadingScreen } from 'components';
import { AppContext } from 'utils/appContext';
import styles from './styles.module.scss';

const LoadingPlaceholder = ({ isFirstHomepageVisit }) => {
  const { contextData } = useContext(AppContext);

  return (!contextData.isFirstHomepageVisit
    ? <LoadingScreen />
    : <div className={styles.placeholder} />);
};
LoadingPlaceholder.propTypes = {
  isFirstHomepageVisit: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({ isFirstHomepageVisit: selectIsFirstHomepageVisit(state) }),
)(LoadingPlaceholder);
