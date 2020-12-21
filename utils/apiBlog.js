import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.API_URL,
  // baseURL: 'http://localhost:3000/api/v1',
  headers: {
  // 'Content-Type': 'aplication/json',
    // Accept: 'aplication/json',
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    // 'Access-Control-Allow-Origin': 'https://yellow.systems',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default axiosClient;
