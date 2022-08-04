const { Redirects } = require('./json');

const safePageRedirect = (query) => (pathRedirectFrom) => {
  const newPath = Redirects[pathRedirectFrom];

  if (!newPath) {
    return null;
  }

  return (`${newPath}${query}`);
};

module.exports = {
  safePageRedirect,
};
