import { getDocumentFields, getFileUrl } from 'utils/helper';

export default ({
  data,
  title = '',
  description = '',
}) => {
  const articles = data.map((article) => {
    const {
      previewImageUrl: image,
      tagsList,
      ...fields
    } = getDocumentFields(
      article,
      [
        'introduction',
        'previewImageUrl',
        'publishedAt',
        'slug',
        'title',
        'tagsList',
      ],
    );

    const tagsListCollection = { items: tagsList.map((tag) => getDocumentFields(tag, ['slug'])) };
    const previewImageUrl = { url: getFileUrl(image) };

    return {
      previewImageUrl,
      tagsListCollection,
      ...fields,
    };
  });

  return {
    articles,
    title,
    description,
  };
};
