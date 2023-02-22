const get = require('lodash/get');

const getTagId = (tag) => tag.sys.id;

const isArrayDiffers = (a, b) => {
  if (a.length !== b.length) {
    return true;
  }

  const s1 = new Set(a);
  const s2 = new Set(b);

  return !(s1.size === s2.size && [...s1].every((item, i) => item === [...s2][i]));
};

module.exports = async (client, { makeRequest }) => {
  const tags = (await makeRequest({ mathod: 'GET', url: '/entries?content_type=tag' })).items;

  const categoryTagsObject = tags
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

  const categoryTags = Object.values(categoryTagsObject);

  client.transformEntries({
    contentType: 'article',
    from: ['categoryTag', 'tagsList', 'slug', 'entryName'],
    to: ['tagsList'],
    transformEntryForLocale: (fields, locale) => {
      const oldTagList = (fields.tagsList?.[locale] || []);
      const tagList = [...oldTagList];

      for (let i = 0; i < tagList.length; i += 1) {
        const categoryTag = categoryTags.find((tag) => getTagId(tag) === getTagId(tagList[i]));

        if (categoryTag) {
          tagList.splice(i, 1);
          tagList.unshift(categoryTag);

          break;
        }
      }

      if (isArrayDiffers(oldTagList.map(getTagId), tagList.map(getTagId))) {
        console.log('oldTagsList', oldTagList.map(getTagId), 'newTagsList', tagList.map(getTagId));

        return { tagsList: tagList };
      }
    },
  });
};
