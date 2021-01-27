const get = require('lodash/get');

module.exports.addFields = (article, contentfulEntryName, language = 'en-US') => {
  console.log('Add fields');
  const valueWithLanguage = (data) => ({ [language]: data });
  const newFields = {
    fields: {
      id: valueWithLanguage(get(article, 'id', 1)),
      body: valueWithLanguage(get(article, 'body', '')),
      createdAt: valueWithLanguage(get(article, 'created_at', new Date())),
      description: valueWithLanguage(get(article, 'description', '')),
      introduction: valueWithLanguage(get(article, 'introduction', '')),
      isFavorite: valueWithLanguage(get(article, 'is_favorite', false)),
      pageTitle: valueWithLanguage(get(article, 'page_title', '')),
      publishedAt: valueWithLanguage(get(article, 'published_at', new Date())),
      slug: valueWithLanguage(get(article, 'slug', '')),
      title: valueWithLanguage(get(article, 'title', '')),
      updatedAt: valueWithLanguage(get(article, 'updated_at', '')),
    },
  };
  return newFields;
};

module.exports.getFields = (contentfulArticle) => {
  const getValueWithoutLanguage = (data) => get(data, '');
  const fields = get(contentfulArticle, 'fields', {});
  Object.keys(fields).forEach((key) => {
    fields[key] = getValueWithoutLanguage(fields[key]);
  });
  return fields;
};

module.exports.addImageToFields = (newFields = {}, language, articleImg, previewImg) => ({
  fields: {
    ...newFields.fields,
    headImageUrl: {
      [language]: {
        sys: {
          type: 'Link',
          linkType: 'Asset',
          id: get(articleImg, 'sys.id', ''),
        },
      },
    },
    previewImageUrl: {
      [language]: {
        sys: {
          type: 'Link',
          linkType: 'Asset',
          id: get(previewImg, 'sys.id', ''),
        },
      },
    },
  },
});

module.exports.deleteFieldAndAsset = async (environment, contentfulManagement, articleId, imageId) => {
  await contentfulManagement.deleteEntry(environment, `${articleId}`);
  await contentfulManagement.deleteAsset(environment, `${imageId}`);
};

module.exports.fetchEntries = async (environment, contentfulManagement, contentTypeId) => {
  const entries = await contentfulManagement.getEntries({
    environment,
    contentType: contentTypeId,
    additionalQueryParams: {
      order: 'sys.createdAt',
    },
    searchType: '[match]',
  });
  return entries;
};

module.exports.entrySearchOptions = (contentTypeId, isWithQuery, key, value) => ({
  contentType: contentTypeId,
  additionalQueryParams: {
    order: 'sys.createdAt',
  },
  searchType: '[match]',
  query: isWithQuery ? { [key]: value } : {},
});
