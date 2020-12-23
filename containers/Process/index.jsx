import React, { Fragment, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectProcessPage } from 'redux/selectors/process';
import { getJSON } from 'redux/actions/process';
import {
  Process,
  Loader,
  // TODO SectionTitle,
} from 'components';
import { PROCESS_DESCRIPTION } from 'utils/constants';
import styles from './styles.module.scss';

const ProcessContainer = ({
  introSection,
  getJSON: getProcessJSON,
  processes: { json, isLoading },
}) => {
  useEffect(() => {
    getProcessJSON();
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Process - Yellow</title>
        <meta name="description" content={PROCESS_DESCRIPTION} />
        <meta property="og:title" content="Process - Yellow" />
        <meta property="og:description" content={PROCESS_DESCRIPTION} />
      </Head>
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
