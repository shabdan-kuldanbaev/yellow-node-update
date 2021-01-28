import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectProcessPage } from 'redux/selectors/process';
import { getJSON } from 'redux/actions/process';
import {
  Process,
  Loader,
  // TODO SectionTitle,
  MetaTags,
} from 'components';
import { PAGES } from 'utils/constants';
import styles from './styles.module.scss';

const ProcessContainer = ({
  introSection,
  getJSON: getProcessJSON,
  processes: { json, isLoading },
}) => {
  useEffect(() => {
    if (!json.length) {
      getProcessJSON();
    }
  }, [json]);

  return (
    <Fragment>
      <MetaTags page={PAGES.process} />
      <section ref={introSection} className={styles.process}>
        {/* TODO <div className={styles.intro}>
      <SectionTitle title="How we work" subtitle="A step by step guide" />
    </div> */}
        <Loader isLoading={!isLoading}>
          <Process processes={json} />
        </Loader>
      </section>
    </Fragment>
  );
};

ProcessContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  getJSON: PropTypes.func.isRequired,
  processes: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({ processes: selectProcessPage(state) }),
  { getJSON },
)(ProcessContainer);
