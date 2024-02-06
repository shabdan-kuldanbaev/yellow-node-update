import DraftArticle from 'containers/DraftArticle';
import { store } from 'store/store';
import { handleError } from 'utils/error';
import blogApi from 'store/apis/blog';

const DraftArticleContainer = ({ introSection, ...rest }) => (
  <DraftArticle
    introSection={introSection}
    {...rest}
  />
);

export const getServerSideProps = async (ctx) => {
  try {
    const { query: { slug } } = ctx;

    await store.dispatch(blogApi.endpoints.getDraftArticle.initiate(slug));

    return {
      props: { slug },
    };
  } catch (error) {
    handleError({
      error,
      message: 'Error in the getInitialBlogProps function in DraftArticle',
    });
  }
};

export default DraftArticleContainer;
