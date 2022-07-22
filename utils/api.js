import axios from 'axios';
import { rootUrl } from 'utils/helper';

// TODO rework it
const apiClient = axios.create({
  baseURL: `${rootUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const API = {
  sendEmail: (formData) => apiClient.post('/contact-us', formData),
  subscribe: (email) => apiClient.post('/subscribe', { email }),
  getJSON: () => apiClient.get('/json'),
  getFileSignedURL: (fileName) => apiClient.post('/signed-file-url', { fileName }),
  uploadFile: (
    signed_url,
    buffer,
    onUploadProgress,
  ) => apiClient.put(
    signed_url,
    buffer,
    {
      onUploadProgress,
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    },
  ),
};
