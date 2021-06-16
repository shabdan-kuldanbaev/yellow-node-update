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

function getFAQList(articleFields) {
  const faqList = get(articleFields, 'frequentlyAskedQuestions', []);

  if (!faqList) {
    return [];
  }

  return faqList.map((question) => getDocumentFields(
    question,
    ['question', 'answer'],
  ));
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
      'frequentlyAskedQuestions',
    ],
  );
  const headImage = getFileUrl(articleFields.headImageUrl);
  const author = getAuthorProps({ author: articleFields.author });
  const faqList = getFAQList(articleFields);

  return {
    ...articleFields,
    headImage,
    author,
    faqList,
  };
}
