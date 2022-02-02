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

const trailingSlashRedirect = (req, res, next) => {
  if (req.path.substr(-1) === '/' && req.path.length > 1) {
    const query = req.url.slice(req.path.length);
    const safePath = req.path.slice(0, -1).replace(/\/+/g, '/');
    res.redirect(301, safePath + query);
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

  if (req.originalUrl.match(/^\/blog\/$/) !== null) {
    res.writeHead(301, { location: '/blog' });
    res.end();
  }

  if (req.originalUrl.match(/^\/works\/$/) !== null) {
    res.writeHead(301, { location: '/works' });
    res.end();
  }

  if (req.originalUrl.match(/^\/process\/$/) !== null) {
    res.writeHead(301, { location: '/process' });
    res.end();
  }

  if (req.originalUrl.match(/^\/company\/$/) !== null) {
    res.writeHead(301, { location: '/company' });
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
  trailingSlashRedirect,
};
