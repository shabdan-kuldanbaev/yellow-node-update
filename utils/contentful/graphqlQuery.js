import isEmpty from 'lodash/isEmpty';

function getParam(params) {
  if (params && !isEmpty(params)) {
    const param = Object.entries(params)[0];

    return param[1]
      ? `${param[0]}: ${param[1]} ,`
      : '';
  }

  return '';
}

const queryfy = (obj) => {
  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const props = obj.map((value) => `${queryfy(value)}`).join(',');

    return `[${props}]`;
  }

  if (typeof obj === 'object') {
    const props = Object.keys(obj)
      .map((key) => `${key}:${queryfy(obj[key])}`)
      .join(',');

    return `{${props}}`;
  }

  return JSON.stringify(obj);
};

function getFilterParams(obj) {
  if (isEmpty(obj)) {
    return 'where: {}';
  }

  return `where: ${queryfy(obj)}`;
}

export const GRAPHQL_QUERY = {
  loadTag({ order, where }) {
    return `
      query {
        tagCollection(
          ${getParam({ order })}
          ${getFilterParams(where)}
        ) {
          items {
            slug
            title
            type
            description
          }
        }
      }
    `;
  },
  loadPortfolioTypes({ order }) {
    return `
      query {
        workTypeCollection(
          ${getParam({ order })}
        ) {
          items {
            slug
            displayName
          }
        }
      }
    `;
  },
  loadPreviewArticles({
    limit,
    order,
    skip,
    where,
  }) {
    return `
      query {
        articleCollection(
          ${getParam({ limit })}
          ${getParam({ order })}
          ${getParam({ skip })}
          ${getFilterParams(where)}
        ) {
          total
          items {
            title
            slug
            previewImageUrl {
              url
            }
            tagsListCollection {
              items {
                slug
              }
            }
            introduction
            publishedAt
          }
        }
      }
    `;
  },
  getNearbyArticle({
    limit,
    order,
    where,
  }) {
    return `
      query {
        articleCollection(
          ${getParam({ limit })}
          ${getParam({ order })}
          ${getFilterParams(where)}
        ) {
          items {
            title
            slug
            tagsListCollection {
              items {
                slug
              }
            }
            previewImageUrl {
              url
            }
          }
        }
      }
    `;
  },
  getRelatedArticles({
    limit,
    where,
  }) {
    return `
      query {
        tagCollection(
          ${getFilterParams(where)}
        ) {
          items {
            linkedFrom {
              articleCollection(
                ${getParam({ limit })}
              ) {
                items {
                  title
                  slug
                  previewImageUrl {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `;
  },
  loadPreviewArticlesByTags({
    limit,
    skip,
    where,
  }) {
    return `
      query {
        tagCollection(
          ${getFilterParams(where)}
          ) {
            items {
              linkedFrom {
                articleCollection(
                  ${getParam({ limit })}
                  ${getParam({ skip })}
              ) {
                total
                items {
                  title
                  slug
                  previewImageUrl {
                    url
                  }
                  introduction
                  publishedAt
                }
              }
            }
          }
        }
      }
    `;
  },
};
