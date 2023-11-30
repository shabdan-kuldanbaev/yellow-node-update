import React from 'react';
import PersonContainer from 'UI/views/Person';
import { wrapper } from 'redux/store';
import personApi from 'redux/apis/person';
import blogApi from 'redux/apis/blog';
import { handleError } from 'utils/error';

const Person = (props) => (
  <PersonContainer {...props} />
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query: { slug } }) => {
  try {
    await store.dispatch(personApi.endpoints.fetchPerson.initiate(slug));

    const state = store.getState();

    const { data = {} } = personApi.endpoints.fetchPerson.select(slug)(state);

    await store.dispatch(blogApi.endpoints.getArticlesRelatedToPerson.initiate({ id: data.id, limit: 3 }));

    if (!data) {
      return {
        notFound: true,
      };
    }

    return {
      props: { slug, id: data.id },
    };
  } catch (error) {
    handleError({
      error,
      message: 'Error in the Person.getServerSideProps function',
    });
  }
});

export default Person;
