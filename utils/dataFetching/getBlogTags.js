import { cache } from 'react';
import { blogClient } from 'utils/contentful/client';
import { GRAPHQL_QUERY } from 'utils/contentful/graphqlQuery';
import { getGraphqlResultTags } from 'utils/contentful/helper';

export const getBlogTags = cache(async () => {
  const req = GRAPHQL_QUERY.loadTag({});

  const res = blogClient.graphql(req);

  return getGraphqlResultTags(res);
});
