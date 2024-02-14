import { store } from 'store/store';
import CaseStudiesContainer from 'containers/CaseStudies';
import { handleError } from 'utils/error';
import { getPage } from 'utils/dataFetching/getPage';

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
    const state = store.getState();
    const { data } = await getPage(project)(state);

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
