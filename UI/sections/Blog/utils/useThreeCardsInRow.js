import { getDocumentFields, getFileUrl } from 'utils/helper';

export default ({
  title = '',
  description = '',
  currentPage,
  articlesNumberPerPage,
  articles,
  totalArticles,
}) => {
  const articlesList = articles.map((article) => {
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

  const pagesCounter = Math.ceil(totalArticles / articlesNumberPerPage);

  return {
    title,
    description,
    articlesList,
    currentPage,
    pagesCounter,
  };
};
