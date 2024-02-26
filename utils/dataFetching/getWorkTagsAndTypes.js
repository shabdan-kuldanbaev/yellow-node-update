import { cache } from 'react';
import { contentfulClient } from 'utils/contentful/client';
import { GRAPHQL_QUERY } from 'utils/contentful/graphqlQuery';
import { getGraphqlResultTags, getGraphqlResultWorkTypes } from 'utils/contentful/helper';
import { handleError } from 'utils/error';

export const getWorkTagsAndTypes = cache(async () => {
  try {
    const tags = await contentfulClient.graphql(
      GRAPHQL_QUERY.loadTag({ where: { type: 'work' }, order: '[title_ASC]' }),
    );
    const types = await contentfulClient.graphql(
      GRAPHQL_QUERY.loadPortfolioTypes({ order: '[entryName_ASC]' }),
    );

    return {
      data: {
        types: getGraphqlResultWorkTypes(types),
        tags: getGraphqlResultTags(tags),
      },
    };
  } catch (e) {
    handleError(e);

    return { error: e.message };
  }
});
