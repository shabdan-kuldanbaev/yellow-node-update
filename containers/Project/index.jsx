import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { selectProject } from 'redux/selectors/portfolio';
import { Project, MetaTags } from 'components';
import {
  rootUrl,
  getDocumentFields,
  getFileUrl,
} from 'utils/helper';
import { PAGES } from 'utils/constants';

const ProjectContainer = ({
  introSection,
  currentProject,
}) => {
  const {
    slug: projectSlug,
    title,
    subtitle,
    body,
    headerImage,
  } = getDocumentFields(
    get(currentProject, 'items[0]', {}),
    [
      'slug',
      'title',
      'subtitle',
      'body',
      'headerImage',
    ],
  );

  const headImage = getFileUrl(headerImage);

  return (
    <Fragment>
      <MetaTags page={PAGES.portfolio} />
      <Project
        slug={projectSlug}
        title={title}
        subtitle={subtitle}
        body={body}
        headerImage={headImage}
        introSection={introSection}
      />
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
