import isEqual from 'lodash/isEqual';
import uniqWith from 'lodash/uniqWith';
import { GRAPHQL_QUERY } from 'utils/contentful/graphqlQuery';
import {
  getGraphqlResultArticles,
  getGraphqlResultArticlesByTags,
  getGraphqlResultTags,
  getGraphqlResultTotalArticlesCount,
  getGraphqlResultTotalArticlesCountByTags,
} from 'utils/contentful/helper';
import { contentfulClient } from 'utils/contentful/client';
import { getDocumentFields } from 'utils/helper';
import { SEARCH_ARTICLES_LIMIT } from 'utils/constants';
import { handleError } from 'utils/error';
import baseApi, { BASEQUERY_TYPES } from '.';

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticlesList: builder.query({
      extraOptions: {
        type: BASEQUERY_TYPES.graphql,
      },
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
      extraOptions: {
        type: BASEQUERY_TYPES.graphql,
      },
      query() {
        return GRAPHQL_QUERY.loadTag({});
      },
      transformResponse(response) {
        return getGraphqlResultTags(response);
      },
    }),

    getArticle: builder.query({
      extraOptions: {
        type: BASEQUERY_TYPES.getEntries,
      },
      async queryFn({ slug }, _, __, baseQuery) {
        const article = (await baseQuery({ contentType: 'article', query: { slug } })).data.items[0];

        const {
          publishedAt,
          tagsList,
        } = getDocumentFields(article, ['tagsList', 'publishedAt']);

        const [next, prev, related] = await Promise.all([
          contentfulClient.graphql(GRAPHQL_QUERY.getNearbyArticle({
            limit: 1,
            order: '[publishedAt_DESC]',
            where: { publishedAt_lt: publishedAt },
          })),
          contentfulClient.graphql(GRAPHQL_QUERY.getNearbyArticle({
            limit: 1,
            order: '[publishedAt_DESC]',
            where: { publishedAt_gt: publishedAt },
          })),
          contentfulClient.graphql(GRAPHQL_QUERY.getRelatedArticles({
            limit: 10,
            where: { slug: tagsList[0].fields.slug },
          })),
        ]);

        return {
          data: {
            article,
            next: getGraphqlResultArticles(next)?.[0] || {},
            prev: getGraphqlResultArticles(prev)?.[0] || {},
            related: getGraphqlResultArticlesByTags(related),
          },
        };
      },
    }),

    getDraftArticle: builder.query({
      extraOptions: {
        isPreview: true,
        type: BASEQUERY_TYPES.getEntries,

      },
      query(slug) {
        return { contentType: 'article', query: { slug } };
      },
      transformResponse(response) {
        return response.items[0];
      },
    }),

    getSearchResult: builder.query({
      async queryFn(value, _, __, baseQuery) {
        if (!value) {
          return { data: [] };
        }

        try {
          const [byTagRaw, byText] = await Promise.all([
            baseQuery(GRAPHQL_QUERY.loadPreviewArticlesByTags({
              where: { title_contains: value },
              limit: SEARCH_ARTICLES_LIMIT,
            })),
            baseQuery(GRAPHQL_QUERY.loadPreviewArticles({
              order: '[publishedAt_DESC]',
              limit: SEARCH_ARTICLES_LIMIT,
              where: {
                OR: [
                  { title_contains: value },
                  { oldBody_contains: value },
                  { title_contains: value },
                ],
              },
            })),
          ]);

          const result = uniqWith([
            ...getGraphqlResultArticlesByTags(byTagRaw.data),
            ...getGraphqlResultArticles(byText.data)], isEqual).sort((a, b) => Date.parse(a) - Date.parse(b));

          return { data: result };
        } catch (e) {
          handleError(e);

          return { error: e.message };
        }
      },
    }),
  }),
});

export const {
  useGetArticlesListQuery,
  useGetTagsQuery,
  useGetArticleQuery,
  useGetSearchResultQuery,
  useGetDraftArticleQuery,
} = blogApi;

export default blogApi;
