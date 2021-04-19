import axios from 'axios';
import { rootUrl } from 'utils/helper';

const apiClient = axios.create({
  baseURL: rootUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const API = {
  sendEmail: (formData) => apiClient.post('/send', formData),
  subscribe: (email) => apiClient.post('/subscribe', { email }),
  getJSON: () => apiClient.get('/json'),
  getSignedURL: (fileName) => apiClient.post('/get-signed-url', { fileName }),
};
