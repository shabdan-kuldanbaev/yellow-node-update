import axios from 'axios';
import { articlesData } from 'containers/Blog/utils/data';
import { priority } from 'utils/constants';

const apiClient = axios.create({
  baseURL: 'https:',
  headers: {
    'Content-Type': 'aplication/json',
    'Accept': 'aplication/json',
  },
});

export const API = {
  getArticle: slug => articlesData.find((article) => article.slug === slug),
  loadArticles: (skip, limit, category) => {
    let leftEdge = (skip - 1) * limit;
    let rightEdge = skip * limit;

    if (category === 'latest') {
      let high = articlesData.filter((article) => article.priority === priority.high);
      let medium = articlesData.filter((article) => article.priority === priority.medium);
      let withoutHighAndMediumArray = articlesData.filter((article) => article.priority !== priority.high && article.priority !== priority.medium);
      let inOrder = [...high, ...medium, ...withoutHighAndMediumArray];

      return inOrder.filter((article, index) => index >= leftEdge && index < rightEdge);
    }
    return articlesData
      .filter((article) => article.category === category)
      .filter((article, index) => index >= leftEdge && index < rightEdge);
  },
};
