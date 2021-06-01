import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectProcessPage } from 'redux/selectors/process';
import {
  Process,
  MetaTags,
  PageTitle,
  Breadcrumbs,
  FullLayout,
} from 'components';
import { PAGES, ROUTES } from 'utils/constants';
import styles from './styles.module.scss';

const ProcessContainer = ({
  introSection,
  processes: { json },
}) => (
  <FullLayout>
    <MetaTags page={PAGES.process} />
    <section
      ref={introSection}
      className={styles.process}
    >
      <Breadcrumbs className={styles.breadcrumbs} />
      <PageTitle title={ROUTES.process.title} />
      <Process processes={json} />
    </section>
  </FullLayout>
);

ProcessContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  processes: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({ processes: selectProcessPage(state) }),
)(ProcessContainer);
