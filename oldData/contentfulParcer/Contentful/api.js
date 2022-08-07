const axios = require('axios');

module.exports.axiosTemporaryClient = axios.create({
  baseURL: `https://cors-anywhere.herokuapp.com/${process.env.API_URL}`,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});
