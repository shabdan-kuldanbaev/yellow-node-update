import axios from 'axios';
import { articlesData } from 'containers/Blog/utils/data';
import { priority } from 'utils/constants';

const apiClient = axios.create({
  // baseURL: 'http://',
  baseURL: 'http:',
  headers: {
    'Content-Type': 'aplication/json',
    Accept: 'aplication/json',
  },
});

export const API = {
  getArticle: (slug) => articlesData.find((article) => article.slug === slug),
  // loadArticles: (skip, limit, category) => apiClient.get(`/blog?category=${category}&page=${skip}&limit=${limit}`),
  loadArticles: (skip, limit, category) => {
    const leftEdge = (skip - 1) * limit;
    const rightEdge = skip * limit;

    if (category === 'latest') {
      const high = articlesData.filter((article) => article.priority === priority.high);
      const medium = articlesData.filter((article) => article.priority === priority.medium);
      const withoutHighAndMediumArray = articlesData.filter((article) => article.priority !== priority.high && article.priority !== priority.medium);
      const inOrder = [...high, ...medium, ...withoutHighAndMediumArray];

      return inOrder.filter((article, index) => index >= leftEdge && index < rightEdge);
    }
    return articlesData
      .filter((article) => article.categoryTag === category)
      .filter((article, index) => index >= leftEdge && index < rightEdge);
  },
};
