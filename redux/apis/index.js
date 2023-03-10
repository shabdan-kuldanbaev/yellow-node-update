import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { contentfulClient, contentfulPreviewClient } from 'utils/contentful/client';

async function baseQuery(args, _, {
  isPreview = false,
  type = 'graphql',
} = {}) {
  const client = isPreview ? contentfulPreviewClient : contentfulClient;

  try {
    const result = await client[type](args);

    return { data: result };
  } catch (e) {
    return { error: e };
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
