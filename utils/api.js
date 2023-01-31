import axios from 'axios';

// TODO rework it
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const API = {
  sendEmail: (formData) => apiClient.post('/contact-us', formData),
  subscribe: (data) => apiClient.post('/subscribe', { ...data }),
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
