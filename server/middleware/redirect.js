const dotenv = require('dotenv');
const { redirects } = require('../utils/redirects');

dotenv.config('./env');

const isProd = process.env.NODE_ENV === 'production';

const redirectToCustomDomain = (req, res, next) => {
  if (req.hostname.includes('yellow-systems-nextjs-prod')) {
    res.redirect(301, `https://${process.env.CUSTOM_DOMAIN}${req.url}`);
  } else {
    next();
  }
};

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

  const firstUrlPart = `${req.protocol}://${host}`;
  const fullUrl = `${firstUrlPart}${req.originalUrl}`;

  const testDoubleSlashes = (url) => /([^:]\/)\/+/g.test(url);

  if (testDoubleSlashes(fullUrl)) {
    return res.redirect(301, fullUrl);
  }

  if (host === 'yellow.id' || testWWW) {
    return res.redirect(301, fullUrl);
  }

  if (host === 'blog.yellow.id' || testWWW) {
    if (req.originalUrl === '/') {
      return res.redirect(301, `${firstUrlPart}/blog`);
    }

    return res.redirect(301, `${firstUrlPart}${req.originalUrl.replace('posts/', 'blog/')}`);
  }

  next();
};

const urlRedirect = (req, res, next) => {
  const redirectPage = redirects.find((page) => req.originalUrl.includes(page.from));

  if (req.originalUrl.match(/\/blog\/(?!\S)/)) {
    res.writeHead(301, { location: '/blog' });
    res.end();
  }

  if (redirectPage) {
    res.writeHead(301, { location: redirectPage.to });
    res.end();
  }

  next();
};

module.exports = {
  redirectToCustomDomain,
  httpsRedirect,
  clearUrlRedirect,
  urlRedirect,
};
