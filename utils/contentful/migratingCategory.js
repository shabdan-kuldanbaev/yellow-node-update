const get = require('lodash/get');

module.exports = async (client, { makeRequest }) => {
  const response = await makeRequest({
    method: 'GET',
    url: '/entries?fields.slug=ios&content_type=tag',
  });

  const tag = get(response, 'items[0]');
  const newTagEntry = { sys: { type: 'Link', linkType: 'Entry', id: tag.sys.id } };

  client.transformEntries({
    contentType: 'article',
    from: ['categoryTag', 'tagsList', 'slug'],
    to: ['tagsList'],
    transformEntryForLocale: (fields, locale) => {
      if (fields?.slug && fields?.slug[locale] === 'how-we-created-famlicious-a-family-chat-app-for-ios-and-android') {
        return { tagsList: [...fields.tagsList[locale], newTagEntry] };
      }
    },
  });
};
