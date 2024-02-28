import { cache } from 'react';
import { blogClient } from 'utils/contentful/client';
import { getArticleProps } from 'utils/contentful/getArticleProps';
import { GRAPHQL_QUERY } from 'utils/contentful/graphqlQuery';
import { getGraphqlResultArticles, getGraphqlResultArticlesByTags } from 'utils/contentful/helper';
import { handleApiError } from 'utils/error';

export const getArticle = cache(async (slug) => {
  if (!slug) {
    return {
      error: 'Wrong argument',
    };
  }

  try {
    const res = await blogClient.getEntries({ contentType: 'article', query: { slug } });
    const rawArticle = res.items[0];

    if (!rawArticle) {
      return {
        error: 'Article not found',
      };
    }

    const article = getArticleProps({ article: rawArticle });

    const [next, prev, related] = await Promise.all([
      blogClient.graphql(GRAPHQL_QUERY.getNearbyArticle({
        limit: 1,
        order: '[publishedAt_DESC]',
        where: { publishedAt_lt: article.publishedAt },
      })),
      blogClient.graphql(GRAPHQL_QUERY.getNearbyArticle({
        limit: 1,
        order: '[publishedAt_DESC]',
        where: { publishedAt_gt: article.publishedAt },
      })),
      blogClient.graphql(GRAPHQL_QUERY.getRelatedArticles({
        limit: 10,
        where: { slug: article.tagsList[0].slug },
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
  } catch (e) {
    handleApiError(e);

    return { error: e.message };
  }
});
