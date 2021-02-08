import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectProcessPreview, selectIsLoading } from 'redux/selectors/layout';
import { fetchPage } from 'redux/actions/layout';
import {
  Process,
  LoadingPage,
  // TODO SectionTitle,
  MetaTags,
} from 'components';
import { PAGES } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

const ProcessContainer = ({
  introSection,
  processes,
  fetchPage,
  isPageLoading,
}) => {
  const { content } = getDocumentFields(processes, ['content']);

  useEffect(() => {
    fetchPage(PAGES.process);
  }, []);

  return (
    <Fragment>
      <MetaTags page={PAGES.process} />
      <LoadingPage isLoading={isPageLoading} />
      <section ref={introSection} className={styles.process}>
        {/* TODO <div className={styles.intro}>
      <SectionTitle title="How we work" subtitle="A step by step guide" />
    </div> */}
        <Process processes={content} />
      </section>
    </Fragment>
  );
};

ProcessContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  processes: PropTypes.instanceOf(Object).isRequired,
  fetchPage: PropTypes.func.isRequired,
  isPageLoading: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    processes: selectProcessPreview(state),
    isPageLoading: selectIsLoading(state),
  }),
  { fetchPage },
)(ProcessContainer);
