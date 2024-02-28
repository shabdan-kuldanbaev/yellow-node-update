import {
  getDocumentFields,
  getFileUrl,
  getImage,
} from 'utils/helper';

function getAuthorProps({ author } = {}) {
  const authorFields = getDocumentFields(
    author,
    [
      'fullName',
      'position',
      'avatar',
      'slug',
    ],
  );
  const avatarImage = getFileUrl(authorFields.avatar);

  return {
    ...authorFields,
    avatarImage,
  };
}

function getFAQList({ frequentlyAskedQuestions }) {
  if (!frequentlyAskedQuestions) {
    return [];
  }

  return frequentlyAskedQuestions.map((question) => getDocumentFields(
    question,
    ['question', 'answer'],
  ));
}

function getTagsList({ tagsList }) {
  if (!tagsList) {
    return [];
  }

  return tagsList.map((question) => getDocumentFields(
    question,
    ['title', 'slug'],
  ));
}

export function getArticleProps({ article } = {}) {
  const articleFields = getDocumentFields(
    article,
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
      'tagsList',
      'categoryTag',
      'metaTitle',
      'metaDescription',
      'author',
      'frequentlyAskedQuestions',
    ],
  );
  const headImage = getImage(articleFields.headImageUrl);
  const author = getAuthorProps({ author: articleFields.author });
  const faqList = getFAQList(articleFields);
  const tagsList = getTagsList(articleFields);

  return {
    ...articleFields,
    headImage,
    author,
    faqList,
    tagsList,
  };
}
