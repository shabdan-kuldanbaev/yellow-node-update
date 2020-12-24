import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Head from 'next/head';
import get from 'lodash/get';
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

  return (
    <Fragment>
      <Head>
        <title>{`${get(project, 'header.title', '')} - Yellow`}</title>
        <meta name="description" content={get(project, 'header.subtitle', '')} />
        <meta property="og:image" content={get(project, 'header.image', '')} />
      </Head>
      <Project project={currentProject} introSection={introSection} />
    </Fragment>
  );
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
