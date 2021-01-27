import axios from 'axios';
import { works, project } from 'containers/Portfolio/utils/data';
import { rootUrl } from 'utils/helper';

const apiClient = axios.create({
  baseURL: rootUrl,
  headers: {
    'Content-Type': 'aplication/json',
    Accept: 'aplication/json',
  },
});

export const API = {
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
  subscribe: (email) => axios.post('/subscribe', { email }),
  getJSON: () => axios.get('/json'),
};
