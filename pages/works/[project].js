import { store } from 'store/store';
import CaseStudiesContainer from 'containers/CaseStudies';
import { handleError } from 'utils/error';
import pageApi from 'store/apis/page';

const Project = ({
  introSection,
  ...rest
}) => (
  <CaseStudiesContainer
    introSection={introSection}
    {...rest}
  />
);

export const getServerSideProps = async ({ query: { project } }) => {
  try {
    await store.dispatch(pageApi.endpoints.fetchPage.initiate(project));
    const state = store.getState();
    const { data } = pageApi.endpoints.fetchPage.select(project)(state);

    if (!data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        slug: project,
        pageFetchQuery: project,
      },
    };
  } catch (error) {
    handleError({
      error,
      message: 'Error in the Project.getInitialProps function',
    });
  }
};

export default Project;
