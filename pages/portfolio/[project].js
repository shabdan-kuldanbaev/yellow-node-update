import React from 'react';
import { END } from 'redux-saga';
import { ProjectContainer } from 'containers';
import { fetchLayoutData } from 'redux/actions/layout';
import { PAGES } from 'utils/constants';

const Project = ({ introSection }) => <ProjectContainer introSection={introSection} />;

Project.getInitialProps = async ({
  store,
  req,
  query: { project },
}) => {
  store.dispatch(fetchLayoutData({
    slug: PAGES.project,
    projectSlug: project,
  }));

  if (req) {
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }

  return {};
};

export default Project;
