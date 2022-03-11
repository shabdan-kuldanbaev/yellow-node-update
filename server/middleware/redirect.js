const dotenv = require('dotenv');
const { devHosts } = require('../utils/constants');
const { safePageRedirect } = require('../utils/pageRedirectUrl');

dotenv.config('./env');

const isProd = process.env.NODE_ENV === 'production';

const trailingSlashRedirect = (req, res, next) => {
  const { url, path } = req;

  if (path.substr(-1) !== '/' || path.length <= 1) {
    return next();
  }

  const query = url.slice(path.length);
  const safePath = path.slice(0, -1).replace(/\/+/g, '/');
  res.redirect(301, safePath + query);
};

const wwwRedirect = (req, res, next) => {
  const {
    method,
    protocol,
    xhr,
    originalUrl,
  } = req;
  const host = req.get('host');

  if (host.indexOf('www.') === -1 || method !== 'GET' || xhr) {
    return next();
  }

  res.redirect(301, `${protocol}://${host.substring(4)}${originalUrl}`);
};

const customDomainRedirect = (req, res, next) => {
  if (req.hostname.includes('yellow-systems-nextjs-prod')) {
    res.redirect(301, `https://${process.env.CUSTOM_DOMAIN}${req.url}`);
  } else {
    next();
  }
};

const httpsRedirect = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https' && isProd && !devHosts.includes(req.hostname)) {
    res.redirect(301, `https://${req.hostname}${req.url}`);
  } else {
    next();
  }
};

const clearUrlRedirect = (req, res, next) => {
  const host = req.get('Host');

  const firstUrlPart = `${req.protocol}://${host}`;
  const fullUrl = `${firstUrlPart}${req.originalUrl}`;

  if (host === 'yellow.id') {
    return res.redirect(301, fullUrl);
  }

  if (host === 'blog.yellow.id') {
    if (req.originalUrl === '/') {
      return res.redirect(301, `${firstUrlPart}/blog`);
    }

    return res.redirect(301, `${firstUrlPart}${req.originalUrl.replace('posts/', 'blog/')}`);
  }

  next();
};

const pageRedirect = (req, res, next) => {
  const { url, path } = req;
  const query = url.slice(path.length);

  const getRedirectUrl = safePageRedirect(query);
  const redirectPath = getRedirectUrl(path);

  if (!redirectPath) {
    return next();
  }

  res.redirect(301, redirectPath);
};

module.exports = {
  customDomainRedirect,
  httpsRedirect,
  clearUrlRedirect,
  wwwRedirect,
  trailingSlashRedirect,
  pageRedirect,
};
