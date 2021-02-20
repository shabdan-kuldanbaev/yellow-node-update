import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectProcessPage } from 'redux/selectors/process';
import { selectIsLoadingScreenCompleted } from 'redux/selectors/layout';
import {
  Process,
  MetaTags,
  LoadingScreen,
} from 'components';
import { PAGES } from 'utils/constants';
import styles from './styles.module.scss';

const ProcessContainer = ({
  introSection,
  processes: { json },
  isLoadingScreenCompleted,
}) => (
  <Fragment>
    <MetaTags page={PAGES.process} />
    {!isLoadingScreenCompleted ? <LoadingScreen /> : (
      <section ref={introSection} className={styles.process}>
        <Process processes={json} />
      </section>
    )}
  </Fragment>
);

ProcessContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  processes: PropTypes.instanceOf(Object).isRequired,
  isLoadingScreenCompleted: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    processes: selectProcessPage(state),
    isLoadingScreenCompleted: selectIsLoadingScreenCompleted(state),
  }),
)(ProcessContainer);
