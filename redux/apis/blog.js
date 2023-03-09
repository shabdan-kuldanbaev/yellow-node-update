import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { contentfulClient } from 'utils/contentful/client';
import { GRAPHQL_QUERY } from 'utils/contentful/graphqlQuery';
import {
  getGraphqlResultArticles,
  getGraphqlResultArticlesByTags,
  getGraphqlResultTags,
  getGraphqlResultTotalArticlesCount,
  getGraphqlResultTotalArticlesCountByTags,
} from 'utils/contentful/helper';

const contentfulBaseQuery = async (args) => {
  try {
    const result = await contentfulClient.graphql(args);

    return { data: result };
  } catch (e) {
    return { error: e };
  }
};

const blogApi = createApi({
  reducerPath: 'blogApi',
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  baseQuery: contentfulBaseQuery,
  endpoints: (builder) => ({
    getArticlesList: builder.query({
      query({
        skip,
        slug,
        isTag,
        limit,
        order = '[publishedAt_DESC]',
      }) {
        if (isTag) {
          return GRAPHQL_QUERY.loadPreviewArticlesByTags({
            limit,
            skip,
            where: { slug },
          });
        }

        return GRAPHQL_QUERY.loadPreviewArticles({
          skip,
          limit,
          order,
        });
      },
      transformResponse(response, _, { isTag }) {
        return {
          items: isTag
            ? getGraphqlResultArticlesByTags(response)
            : getGraphqlResultArticles(response),
          total: isTag
            ? getGraphqlResultTotalArticlesCountByTags(response)
            : getGraphqlResultTotalArticlesCount(response),
        };
      },
    }),
    getTags: builder.query({
      query() {
        return GRAPHQL_QUERY.loadTag({});
      },
      transformResponse(response) {
        return getGraphqlResultTags(response);
      },
    }),
  }),
});

export default blogApi;
