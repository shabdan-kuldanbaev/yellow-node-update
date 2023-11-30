import React from 'react';
import PersonContainer from 'UI/views/Person';
import { wrapper } from 'redux/store';
import personApi from 'redux/apis/person';
import blogApi from 'redux/apis/blog';
import { handleError } from 'utils/error';
import { ARTICLES_NUMBER_PER_PERSON_PAGE } from 'utils/constants';

const Person = (props) => (
  <PersonContainer {...props} />
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({
  query: {
    slug = '',
  },
}) => {
  const props = {
    articlesNumberPerPage: ARTICLES_NUMBER_PER_PERSON_PAGE,
  };

  const query = { slug };

  const page = 1;
  const skip = (page - 1) * ARTICLES_NUMBER_PER_PERSON_PAGE;

  try {
    await store.dispatch(personApi.endpoints.fetchPerson.initiate(slug));

    const state = store.getState();

    const { data = {} } = personApi.endpoints.fetchPerson.select(slug)(state);

    Object.assign(query, {
      skip,
      id: data?.id,
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
});

export default Person;
