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
            next: getGraphqlResultArticles(next)?.[0],
            prev: getGraphqlResultArticles(prev)?.[0],
            related: getGraphqlResultArticlesByTags(related),
          },
        };
      },
    }),
  }),
});

export const {
  useGetArticlesListQuery,
  useGetArticleQuery,
} = blogApi;

export default blogApi;
