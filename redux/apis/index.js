import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { contentfulClient } from 'utils/contentful/client';

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
    return { error: e.meesage };
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
