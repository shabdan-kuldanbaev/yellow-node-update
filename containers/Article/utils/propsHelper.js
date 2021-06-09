import get from 'lodash/get';
import { getDocumentFields, getFileUrl } from 'utils/helper';

function getAuthorProps({ author } = {}) {
  const authorFields = getDocumentFields(
    author,
    [
      'fullName',
      'position',
      'avatar',
    ],
  );
  const avatarImage = getFileUrl(authorFields.avatar);

  return {
    ...authorFields,
    avatarImage,
  };
}

export function getArticleProps({ article } = {}) {
  const articleFields = getDocumentFields(
    get(article, 'items[0]', {}),
    [
      'slug',
      'title',
      'description',
      'oldBody',
      'body',
      'introduction',
      'headImageUrl',
      'publishedAt',
      'updatedAt',
      'keyWords',
      'categoryTag',
      'metaTitle',
      'metaDescription',
      'author',
    ],
  );
  const headImage = getFileUrl(articleFields.headImageUrl);
  const author = getAuthorProps({ author: articleFields.author });

  return {
    ...articleFields,
    headImage,
    author,
  };
}

export function getNearbyArticlesProps({ nearbyArticles } = {}) {
  const getNearbyArticlesSlug = (object) => get(nearbyArticles, `${object}.slug`);
  const getNearbyArticlesTitle = (object) => get(nearbyArticles, `${object}.title`);
  const getNearbyArticlesImage = (object) => get(nearbyArticles, `${object}.previewImageUrl.url`);

  return {
    prevArticle: {
      slug: getNearbyArticlesSlug('olderArticle'),
      title: getNearbyArticlesTitle('olderArticle'),
      previewImageUrl: getNearbyArticlesImage('olderArticle'),
    },
    nextArticle: {
      slug: getNearbyArticlesSlug('newerArticle'),
      title: getNearbyArticlesTitle('newerArticle'),
      previewImageUrl: getNearbyArticlesImage('newerArticle'),
    },
  };
}
