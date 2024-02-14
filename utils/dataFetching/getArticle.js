import { cache } from 'react';
import { blogClient } from 'utils/contentful/client';
import { GRAPHQL_QUERY } from 'utils/contentful/graphqlQuery';
import { getGraphqlResultArticles, getGraphqlResultArticlesByTags } from 'utils/contentful/helper';
import { getDocumentFields } from 'utils/helper';

export const getArticle = cache(async (slug) => {
  if (!slug) {
    return {
      error: 'Wrong argument',
    };
  }

  const article = (await blogClient.getEntries({ contentType: 'article', query: { slug } })).data.items[0];

  const {
    publishedAt,
    tagsList,
  } = getDocumentFields(article, ['tagsList', 'publishedAt']);

  const [next, prev, related] = await Promise.all([
    blogClient.graphql(GRAPHQL_QUERY.getNearbyArticle({
      limit: 1,
      order: '[publishedAt_DESC]',
      where: { publishedAt_lt: publishedAt },
    })),
    blogClient.graphql(GRAPHQL_QUERY.getNearbyArticle({
      limit: 1,
      order: '[publishedAt_DESC]',
      where: { publishedAt_gt: publishedAt },
    })),
    blogClient.graphql(GRAPHQL_QUERY.getRelatedArticles({
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
});
