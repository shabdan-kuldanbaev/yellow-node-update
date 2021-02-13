import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectProcessPage } from 'redux/selectors/process';
import { selectIsLoadingScreenCompleted } from 'redux/selectors/layout';
import { getJSON } from 'redux/actions/process';
import {
  Process,
  // TODO SectionTitle,
  MetaTags,
  LoadingScreen,
} from 'components';
import { PAGES } from 'utils/constants';
import styles from './styles.module.scss';

const ProcessContainer = ({
  introSection,
  getJSON: getProcessJSON,
  processes: { json },
  isLoadingScreenCompleted,
}) => {
  useEffect(() => {
    if (!json.length) {
      getProcessJSON();
    }
  }, [json]);

  return (
    <Fragment>
      <MetaTags page={PAGES.process} />
      {!isLoadingScreenCompleted ? <LoadingScreen /> : (
        <section ref={introSection} className={styles.process}>
          {/* TODO <div className={styles.intro}>
      <SectionTitle title="How we work" subtitle="A step by step guide" />
    </div> */}
          <Process processes={json} />
        </section>
      )}
    </Fragment>
  );
};

ProcessContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  getJSON: PropTypes.func.isRequired,
  processes: PropTypes.instanceOf(Object).isRequired,
  isLoadingScreenCompleted: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    processes: selectProcessPage(state),
    isLoadingScreenCompleted: selectIsLoadingScreenCompleted(state),
  }),
  { getJSON },
)(ProcessContainer);
