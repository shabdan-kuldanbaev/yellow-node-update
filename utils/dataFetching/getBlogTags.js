import { cache } from 'react';
import { blogClient } from 'utils/contentful/client';
import { GRAPHQL_QUERY } from 'utils/contentful/graphqlQuery';
import { getGraphqlResultTags } from 'utils/contentful/helper';
import { handleApiError } from 'utils/error';

export const getBlogTags = cache(async () => {
  const req = GRAPHQL_QUERY.loadTag({});

  try {
    const res = blogClient.graphql(req);

    return { data: getGraphqlResultTags(res) };
  } catch (e) {
    handleApiError(e);

    return { error: e.message };
  }
});
