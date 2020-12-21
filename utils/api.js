import axios from 'axios';
import { articlesData } from 'containers/Blog/utils/data';
import { works, project } from 'containers/Portfolio/utils/data';
import { articleData } from 'containers/Article/utils/data';
import { priority } from 'utils/constants';
import { rootUrl } from 'utils/helper';

export const axiosTemporaryClient = axios.create({ // TODO remove it
  baseURL: process.env.API_URL,
});

const apiClient = axios.create({
  baseURL: rootUrl,
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
  loadRelatedArticles: (category) => {
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    const relatedArticles = articlesData.filter((article) => article.categoryTag === category);

    shuffle(relatedArticles);

    return relatedArticles.slice(0, 5);
  },
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
    isSendNDAChecked,
    projectBudget,
  }) => {
    const formData = new window.FormData();
    [...selectedFiles].map((file) => formData.append('files', file));
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('projectDescription', projectDescription);
    if (isSendNDAChecked) formData.append('isSendNDAChecked', isSendNDAChecked);
    if (projectBudget) formData.append('projectBudget', projectBudget);

    return axios.post('/send', formData);
  },
  subscribe: ({ email }) => axios.post('/subscribe', { email }),
  getJSON: () => axios.get('/json'),
};
