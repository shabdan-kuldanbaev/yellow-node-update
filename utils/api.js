import { articlesData } from 'containers/BlogCommon/utils/data';
import { priority } from 'utils/constants';

export const api = {
  getPost: slug => articlesData.find(article => article.slug === slug),
  loadPosts: (skip, limit, category) => {
    let leftEdge = (skip - 1) * limit;
    let rightEdge = skip * limit;

    if (category === 'latest') {
      let high = articlesData.filter(article => article.priority === priority.high);
      let medium = articlesData.filter(article => article.priority === priority.medium);
      let withoutHighAndMediumArray = articlesData.filter(article => article.priority !== priority.high && article.priority !== priority.medium);
      let inOrder = [ ...high, ...medium, ...withoutHighAndMediumArray ];

      return inOrder.filter((article, index) => index >= leftEdge && index < rightEdge);
    } else {
      let newArticles = articlesData.filter(article => article.category === category);
      return newArticles.filter((article, index) => index >= leftEdge && index < rightEdge);
    }
  }
};
