const pageRedirectUrl = (query) => (pathRedirectFrom) => ({
  '/works/cashchat': `/works/cash-chat${query}`,
  '/travgenius': `/works/travgenius${query}`,
  '/omni-market-tide': `/works/omni-market-tide${query}`,
  '/blog/monolit...oosing-the-right-architecture-for-the-project': `/blog/microservices-vs-monolithic${query}`,
}[pathRedirectFrom]);

module.exports = {
  pageRedirectUrl,
};
