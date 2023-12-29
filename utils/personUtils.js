import { ARTICLES_NUMBER_PER_PERSON_PAGE } from 'utils/constants';
import personApi from 'store/apis/person';
import blogApi from 'store/apis/blog';
import { handleError } from 'utils/error';

export const getInitialPersonProps = async (store, ctx) => {
  const {
    query: {
      slug = '',
      page = 1,
    },
  } = ctx;

  const props = {
    articlesNumberPerPage: ARTICLES_NUMBER_PER_PERSON_PAGE,
  };

  const query = { slug };

  const skip = (page - 1) * ARTICLES_NUMBER_PER_PERSON_PAGE;

  try {
    const { data } = await store.dispatch(personApi.endpoints.fetchPerson.initiate(slug));
    Object.assign(query, {
      id: data?.id,
      skip,
      limit: ARTICLES_NUMBER_PER_PERSON_PAGE,
    });

    Object.assign(props, {
      query,
      currentPage: page,
      pageFetchQuery: query,
    });

    await store.dispatch(blogApi.endpoints.getArticlesRelatedToPerson.initiate(query));

    if (!data) {
      return {
        notFound: true,
      };
    }

    return { props };
  } catch (error) {
    handleError({
      error,
      message: 'Error in the Person.getServerSideProps function',
    });
  }
};
