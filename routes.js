const routes = require('next-routes');

module.exports = routes()
  .add('index', '/', 'index')
  .add('portfolio', '/portfolio', 'portfolio')
  .add('process', '/process', 'process')
  .add('blog', '/blog/:slug')
  .add('company', '/company', 'company');
