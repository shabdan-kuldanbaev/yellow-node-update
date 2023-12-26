const { blogClient } = require('utils/contentful/client');
const { default: baseApi, BASEQUERY_TYPES } = require('.');

const personApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchPerson: builder.query({
      extraOptions: {
        client: blogClient,
        type: BASEQUERY_TYPES.getEntries,
      },
      query(slug) {
        return {
          contentType: 'person',
          additionalQueryParams: {
            'fields.slug': slug,
          },
        };
      },
      transformResponse(response) {
        return {
          ...response.items[0].fields,
          id: response.items[0].sys.id,
        };
      },
    }),
  }),
});

export const { useFetchPersonQuery } = personApi;

export default personApi;
