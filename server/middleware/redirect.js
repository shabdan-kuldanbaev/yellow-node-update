const dotenv = require('dotenv');
const { olsPortfolioPages } = require('../utils/data');

dotenv.config('./env');

const isProd = process.env.NODE_ENV === 'production';
const ROOT_URL = isProd ? process.env.PROD_URL : process.env.DEV_URL;

const httpsRedirect = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https' && isProd) {
    res.redirect(301, `https://${req.hostname}${req.url}`);
  } else {
    next();
  }
};

const clearUrlRedirect = (req, res, next) => {
  const host = req.get('Host');
  const testWWW = /^www\./g.test(host);

  const fullUrl = `${req.protocol}://${host}${req.originalUrl}`;

  const testDoubleSlashes = (url) => /([^:]\/)\/+/g.test(url);

  if (testDoubleSlashes(fullUrl)) {
    return res.redirect(301, `${ROOT_URL}${req.originalUrl}`);
  }

  if (host === 'yellow.id' || testWWW) {
    return res.redirect(301, `${ROOT_URL}${req.originalUrl}`);
  }

  if (host === 'blog.yellow.id' || testWWW) {
    if (req.originalUrl === '/') {
      return res.redirect(301, `${ROOT_URL}/blog`);
    }

    return res.redirect(301, `${ROOT_URL}${req.originalUrl.replace('posts/', 'blog/')}`);
  }

  next();
};

const oldUrlRedirect = (req, res, next) => {
  const isOlsPortfolioPages = olsPortfolioPages.some((page) => req.originalUrl.includes(page));

  if (isOlsPortfolioPages) {
    return res.redirect(301, `${ROOT_URL}/portfolio`);
  }

  if (req.originalUrl.includes('/team')) {
    return res.redirect(301, `${ROOT_URL}${req.originalUrl.replace('team', 'company')}`);
  }

  next();
};

module.exports = {
  httpsRedirect,
  clearUrlRedirect,
  oldUrlRedirect,
};
