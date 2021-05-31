import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectProcessPage } from 'redux/selectors/process';
import {
  Process,
  MetaTags,
  FullLayout,
} from 'components';
import { PAGES } from 'utils/constants';
import styles from './styles.module.scss';

const ProcessContainer = ({
  introSection,
  processes: { json },
}) => (
  <FullLayout>
    <MetaTags page={PAGES.process} />
    <Process processes={json} />
  </FullLayout>
);

ProcessContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  processes: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({ processes: selectProcessPage(state) }),
)(ProcessContainer);
