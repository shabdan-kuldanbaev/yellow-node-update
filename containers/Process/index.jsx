import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectProcessPage } from 'redux/selectors/process';
import {
  Process,
  MetaTags,
  PageHeader,
  FullLayout,
} from 'components';
import { PAGES, ROUTES } from 'utils/constants';
import styles from './styles.module.scss';

const ProcessContainer = ({
  introSection,
  processes: { json },
}) => {
  const breadcrumbs = [{
    title: ROUTES.process.title,
    to: ROUTES.process.path,
  }];

  return (
    <FullLayout>
      <MetaTags page={PAGES.process} />
      <section
        ref={introSection}
        className={styles.process}
      >
        <PageHeader
          title={ROUTES.process.title}
          breadcrumbs={breadcrumbs}
        />
        <Process processes={json} />
      </section>
    </FullLayout>
  );
};

ProcessContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  processes: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({ processes: selectProcessPage(state) }),
)(ProcessContainer);
