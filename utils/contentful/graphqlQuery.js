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

function getFilterParams(where) {
  if (!isEmpty(where)) {
    const filterParams = Object
      .keys(where)
      .map((key) => {
        if (typeof where[key] === 'boolean') {
          return `${key}: ${where[key]}`;
        }

        return `${key}: "${where[key]}"`;
      })
      .join(',');

    return `where: {${filterParams}},`;
  }

  return 'where: {}';
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
  getNearbyAndRelatedArticle({
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
  loadPreviewArticlesByTags({
    limit,
    where,
    order,
  }) {
    return `
      query {
        tagCollection(
          ${getParam({ limit })}
          ${getParam({ order })}
          ${getFilterParams(where)}
        ) {
          items {
            linkedFrom {
              articleCollection {
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
