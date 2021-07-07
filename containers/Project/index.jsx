import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { useRouter } from 'next/router';
import { selectProject } from 'redux/selectors/portfolio';
import { Project, MetaTags } from 'components';
import { getDocumentFields, rootUrl } from 'utils/helper';
import { PAGES } from 'utils/constants';

const ProjectContainer = ({ introSection, currentProject }) => {
  const { asPath } = useRouter();
  const { body, metaTitle, metaDescription } = getDocumentFields(
    get(currentProject, 'items[0]', {}),
    ['body'],
  );
  const pageMetadata = {
    metaTitle,
    metaDescription,
    url: `${rootUrl}${asPath}`,
  };

  return (
    <Fragment>
      <MetaTags
        page={PAGES.portfolio}
        pageMetadata={pageMetadata}
      />
      <Project
        body={body}
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
