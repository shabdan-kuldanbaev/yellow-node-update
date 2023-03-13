import { getFileUrl } from 'utils/helper';
import baseApi, { BASEQUERY_TYPES } from '.';

const pageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchPage: builder.query({
      extraOptions: {
        type: BASEQUERY_TYPES.getEntries,
      },
      query: (slug) => ({
        contentType: 'page',
        additionalQueryParams: {
          'fields.slug': slug,
        },
      }),
      transformResponse(response) {
        const data = response.items[0].fields;

        return {
          ...data,
          metaData: {
            metaTitle: data.metaTitle || '',
            metaDescription: data.metaDescription || '',
            metaRobots: data.metaRobots || '',
            ogImage: getFileUrl(data.ogImage),
          },
        };
      },
    }),
  }),
});

export const {
  useFetchPageQuery,
} = pageApi;

export default pageApi;
