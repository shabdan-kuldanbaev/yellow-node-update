import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectProcessPage } from 'redux/selectors/process';
import {
  Process,
  MetaTags,
  PageTitle,
  Breadcrumbs,
} from 'components';
import { PAGES } from 'utils/constants';
import styles from './styles.module.scss';

const ProcessContainer = ({
  introSection,
  processes: { json },
}) => (
  <Fragment>
    <MetaTags page={PAGES.process} />
    <section
      ref={introSection}
      className={styles.process}
    >
      <Breadcrumbs className={styles.breadcrumbs} />
      <PageTitle title={PAGES.process.title} />
      <Process processes={json} />
    </section>
  </Fragment>
);

ProcessContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  processes: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({ processes: selectProcessPage(state) }),
)(ProcessContainer);
