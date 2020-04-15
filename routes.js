const routes = require('next-routes');

module.exports = routes()
  .add('index', '/', 'index')
  .add('blog', '/blog/categoryItem', 'blog');
