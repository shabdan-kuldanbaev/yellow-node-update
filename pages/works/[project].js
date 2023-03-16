import React from 'react';
import { wrapper } from 'redux/store';
import CaseStudiesContainer from 'containers/CaseStudies';
import { handleError } from 'utils/error';
import pageApi from 'redux/apis/page';

const Project = ({
  introSection,
  ...rest
}) => (
  <CaseStudiesContainer
    introSection={introSection}
    {...rest}
  />
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query: { project } }) => {
  try {
    await store.dispatch(pageApi.endpoints.fetchPage.initiate(project));

    return {
      props: {
        slug: project,
      },
    };
  } catch (error) {
    handleError({
      error,
      message: 'Error in the Project.getInitialProps function',
    });
  }
});

export default Project;
