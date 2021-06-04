const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config('./env');

module.exports.axiosTemporaryClient = axios.create({
  baseURL: `https://cors-anywhere.herokuapp.com/${process.env.API_URL}`,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});
