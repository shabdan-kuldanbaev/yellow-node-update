const get = require('lodash/get');

const getTagId = (tag) => tag.sys.id;

const isArrayDiffers = (a, b) => {
  if (a.length !== b.length) {
    return true;
  }

  const s1 = new Set(a);
  const s2 = new Set(b);

  return !(s1.size === s2.size && [...s1].every((item) => s2.has(item)));
};

module.exports = async (client, { makeRequest }) => {
  const tags = (await makeRequest({ mathod: 'GET', url: '/entries?content_type=tag' })).items;

  const categoryTags = tags
    .filter((tag) => {
      console.log(tag.fields);

      switch (tag.fields.slug['en-US']) {
      case 'how-we-work':
      case 'marketing':
      case 'yellow':
      case 'software-chat':
      case 'software-development':
      case 'fintech':
        return true;
      default:
        return false;
      }
    })
    .reduce((acc, tag) => {
      acc[tag.fields.slug['en-US']] = { sys: { type: 'Link', linkType: 'Entry', id: tag.sys.id } };

      return acc;
    }, {});

  const tagsIds = tags.map((tag) => tag.sys.id);

  console.log(categoryTags);

  client.transformEntries({
    contentType: 'article',
    from: ['categoryTag', 'tagsList', 'slug', 'entryName'],
    to: ['tagsList'],
    transformEntryForLocale: (fields, locale) => {
      if (!fields?.categoryTag) {
        return console.log('no category', fields);
      }

      const categorySlug = fields.categoryTag['en-US'];

      const oldTagList = (fields.tagsList?.[locale] || []);

      const tagList = oldTagList
        .filter((tag) => tagsIds.includes(tag.sys.id))
        .map((tag) => {
          if (tag.sys.id === '6Zq0fESb4zX3RyXYm329Q6') { // Replacing Chat tag with Software-Chat
            return categoryTags['software-chat'];
          }

          return tag;
        });

      const tagsMap = new Map();
      [...tagList, categoryTags[categorySlug]].forEach((item) => tagsMap.set(item.sys.id, item));
      const newTagsList = Array.from(tagsMap.values());

      if (isArrayDiffers(oldTagList.map(getTagId), newTagsList.map(getTagId))) {
        console.log('oldTagsList', oldTagList.map(getTagId), 'newTagsList', newTagsList.map(getTagId));

        return { tagsList: newTagsList };
      }
    },
  });
};
