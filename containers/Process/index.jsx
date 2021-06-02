import React, { Fragment } from 'react';
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
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import styles from './styles.module.scss';

const ProcessContainer = ({
  introSection,
  processes: { json },
}) => (
  <Fragment>
    <MetaTags
      page={PAGES.process}
      breadcrumbs={pagesBreadcrumbs.process()}
    />
    <FullLayout introSection={introSection}>
      <PageHeader
        title={ROUTES.process.title}
        breadcrumbs={pagesBreadcrumbs.process()}
      />
      <Process processes={json} />
    </FullLayout>
  </Fragment>
);

ProcessContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  processes: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({ processes: selectProcessPage(state) }),
)(ProcessContainer);
