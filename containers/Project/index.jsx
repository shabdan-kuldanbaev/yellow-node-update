import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { selectProject } from 'redux/selectors/portfolio';
import { Project, MetaTags } from 'components';
import { getDocumentFields } from 'utils/helper';
import { PAGES } from 'utils/constants';

const ProjectContainer = ({ introSection, currentProject }) => {
  const { body } = getDocumentFields(
    get(currentProject, 'items[0]', {}),
    ['body'],
  );

  return (
    <Fragment>
      <MetaTags page={PAGES.portfolio} />
      <Project body={body} introSection={introSection} />
    </Fragment>
  );
};

ProjectContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  currentProject: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({ currentProject: selectProject(state) }),
)(ProjectContainer);
