import axios from 'axios';
import { articlesData } from 'containers/Blog/utils/data';
import { works, project } from 'containers/Portfolio/utils/data';
import { articleData } from 'containers/Article/utils/data';
import { priority } from 'utils/constants';

const apiClient = axios.create({
  // TODO baseURL: 'http://',
  baseURL: 'http:',
  headers: {
    'Content-Type': 'aplication/json',
    Accept: 'aplication/json',
  },
});

export const API = {
  getArticle: (slug) => articleData.find((article) => article.slug === slug),
  // TODO loadArticles: (skip, limit, category) => apiClient.get(`/blog?category=${category}&page=${skip}&limit=${limit}`),
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
  loadRelatedArticles: (category) => articlesData
    .filter((article) => article.categoryTag === category)
    .slice(0, 5),
  loadNearbyArticles: (name) => {
    const articleIndex = articlesData.findIndex((item) => item.title === name);

    if (articleIndex) {
      return {
        newerArticle: articlesData.find((item, index) => index === articleIndex - 1),
        olderArticle: articlesData.find((item, index) => index === articleIndex + 1),
      };
    }
    return null;
  },
  loadWorks: () => works,
  getProject: () => project,
  sendEmail: ({
    fullName,
    email,
    projectDescription,
    selectedFiles,
    projectBudget,
  }) => {
    const formData = new window.FormData();
    [...selectedFiles].map((file) => formData.append('files', file));
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('projectDescription', projectDescription);
    formData.append('projectBudget', projectBudget);

    return axios.post('/send', formData);
  },
  subscribe: ({ email }) => axios.post('/subscribe', { email }),
};
