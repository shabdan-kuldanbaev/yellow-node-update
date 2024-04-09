import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { contentfulClient, fallbackClient } from 'utils/contentful/client';

export const BASEQUERY_TYPES = {
  graphql: 'graphql',
  getEntries: 'getEntries',
};

async function baseQuery(args, _, {
  client = contentfulClient,
  type = BASEQUERY_TYPES.getEntries,
} = {}) {
  try {
    const result = await client[type](args);

    return { data: result };
  } catch (e) {
    if (type === BASEQUERY_TYPES.getEntries && e.message === '404') {
      try {
        const result = await fallbackClient[type](args);

        return { data: result };
      } catch (err) {
        return { error: err.message };
      }
    }

    return { error: e.message };
  }
}

const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: () => ({}),
});

export default baseApi;
