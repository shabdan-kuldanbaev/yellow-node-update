import { GRAPHQL_QUERY } from 'utils/contentful/graphqlQuery';
import { getGraphqlResultTags, getGraphqlResultWorkTypes } from 'utils/contentful/helper';
import baseApi, { BASEQUERY_TYPES } from '.';

const worksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loadTagsAndTypes: builder.query({
      extraOptions: {
        type: BASEQUERY_TYPES.graphql,
      },
      async queryFn(_, __, ___, baseQuery) {
        const [tagsData, typesData] = await Promise.all([
          baseQuery(GRAPHQL_QUERY.loadTag({ where: { type: 'work' }, order: '[title_ASC]' })),
          baseQuery(GRAPHQL_QUERY.loadPortfolioTypes({ order: '[entryName_ASC]' })),
        ]);

        return {
          data: {
            types: getGraphqlResultWorkTypes(typesData.data),
            tags: getGraphqlResultTags(tagsData.data),
          },
        };
      },
    }),
  }),
});

export const {
  useLoadTagsAndTypesQuery,
} = worksApi;

export default worksApi;
