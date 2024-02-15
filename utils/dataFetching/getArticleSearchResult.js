import { cache } from 'react';
import uniqWith from 'lodash/uniqWith';
import { SEARCH_ARTICLES_LIMIT } from 'utils/constants';
import { blogClient } from 'utils/contentful/client';
import { GRAPHQL_QUERY } from 'utils/contentful/graphqlQuery';
import { getGraphqlResultArticles, getGraphqlResultArticlesByTags } from 'utils/contentful/helper';
import { handleError } from 'utils/error';

export const getArticleSearchResult = cache(async (value) => {
  if (!value) {
    return { data: [] };
  }

  try {
    const [byTagRaw, byText] = await Promise.all([
      blogClient.graphql(GRAPHQL_QUERY.loadPreviewArticlesByTags({
        where: { title_contains: value },
        limit: SEARCH_ARTICLES_LIMIT,
      })),
      blogClient.graphql(GRAPHQL_QUERY.loadPreviewArticles({
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

    const result = uniqWith(
      [...getGraphqlResultArticlesByTags(byTagRaw.data), ...getGraphqlResultArticles(byText.data)],
      ((article1, article2) => article1.slug === article2.slug),
    ).sort((a, b) => Date.parse(a) - Date.parse(b));

    return { data: result };
  } catch (e) {
    handleError(e);

    return { error: e.message };
  }
});
