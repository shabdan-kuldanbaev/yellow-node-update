import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { selectProject } from 'redux/selectors/portfolio';
import { getProject } from 'redux/actions/portfolio';
import { Project } from 'components';

const ProjectContainer = ({
  introSection,
  currentProject,
  getProject: getCurrentProject,
}) => {
  const { query: { project } } = useRouter();

  useEffect(() => {
    if (project) getCurrentProject();
  }, []);

  return <Project project={currentProject} introSection={introSection} />;
};

ProjectContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  currentProject: PropTypes.instanceOf(Object).isRequired,
  getProject: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({ currentProject: selectProject(state) }),
  { getProject },
)(ProjectContainer);
