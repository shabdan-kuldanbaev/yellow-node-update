import { GRAPHQL_QUERY } from 'utils/contentful/graphqlQuery';
import {
  getGraphqlResultArticles,
  getGraphqlResultArticlesByTags,
  getGraphqlResultTags,
  getGraphqlResultTotalArticlesCount,
  getGraphqlResultTotalArticlesCountByTags,
} from 'utils/contentful/helper';
import baseApi from '.';

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticlesList: builder.query({
      query({
        slug,
        skip,
        limit,
        isTag = false,
        order = '[publishedAt_DESC]',
      }) {
        return isTag
          ? GRAPHQL_QUERY.loadPreviewArticlesByTags({
            limit,
            skip,
            where: { slug },
          }) : GRAPHQL_QUERY.loadPreviewArticles({
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

    getArticle: builder.query({
      extraOptions: {
        type: 'getEntries',
      },
      query({ slug }) {
        return {
          contentType: 'article',
          query: { slug },
        };
      },
      transformResponse(response) {
        return response.items[0];
      },
    }),
  }),
});

export const {
  useGetArticlesListQuery,
  useGetArticleQuery,
} = blogApi;

export default blogApi;
