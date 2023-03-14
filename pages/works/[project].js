import React from 'react';
import { wrapper } from 'redux/store';
import CaseStudiesContainer from 'containers/CaseStudies';
import PageNotFound from 'containers/PageNotFound';
import errorHelper from 'utils/error';
import pageApi from 'redux/apis/page';

const Project = ({
  introSection,
  statusCode,
  ...rest
}) => {
  if (statusCode === 404) {
    return <PageNotFound />;
  }

  return (
    <CaseStudiesContainer
      introSection={introSection}
      {...rest}
    />
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query: { project } }) => {
  try {
    await store.dispatch(pageApi.endpoints.fetchPage.initiate(project));

    return {
      props: {
        slug: project,
      },
    };
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the Project.getInitialProps function',
    });
  }
});

export default Project;
