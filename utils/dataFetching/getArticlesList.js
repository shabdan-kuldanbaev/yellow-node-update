import { cache } from 'react';
import { blogClient } from 'utils/contentful/client';
import { GRAPHQL_QUERY } from 'utils/contentful/graphqlQuery';
import {
  getGraphqlResultArticles,
  getGraphqlResultArticlesByTags,
  getGraphqlResultTotalArticlesCount,
  getGraphqlResultTotalArticlesCountByTags,
} from 'utils/contentful/helper';

export const getArticlesList = cache(async ({
  slug,
  skip,
  limit,
  isTag = false,
  order = '[publishedAt_DESC]',
}) => {
  const request = isTag
    ? GRAPHQL_QUERY.loadPreviewArticlesByTags({
      limit,
      skip,
      order,
      where: { slug },
    }) : GRAPHQL_QUERY.loadPreviewArticles({
      skip,
      limit,
      order,
    });

  const response = blogClient.graphql(request);

  return {
    items: isTag
      ? getGraphqlResultArticlesByTags(response)
      : getGraphqlResultArticles(response),
    total: isTag
      ? getGraphqlResultTotalArticlesCountByTags(response)
      : getGraphqlResultTotalArticlesCount(response),
  };
});
