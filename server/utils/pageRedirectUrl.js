const safePageRedirect = (query) => (pathRedirectFrom) => {
  const newUrl = {
    '/works/cashchat': '/works/cash-chat',
    '/travgenius': '/works/travgenius',
    '/omni-market-tide': '/works/omni-market-tide',
    '/blog/monolit...oosing-the-right-architecture-for-the-project': '/blog/microservices-vs-monolithic',
    '/portfolio/smart-center': '/works',
    '/portfolio/whiledriving': '/works',
    '/portfolio/whatsyours': '/works',
    '/portfolio/start-sport': '/works',
    '/portfolio/stickerbox': '/works/stickerbox',
    '/portfolio/famlicious': '/works/famlicious',
    '/portfolio/separate-us': '/works/separate-us',
    '/portfolio/omni-market-tide': '/works/omni-market-tide',
    '/portfolio/racefully': '/works/racefully',
    '/portfolio/travgenius': '/works/travgenius',
    '/portfolio/speakfree': '/works/speakfree',
    '/portfolio': '/works',
    '/team': '/company',
    '/10-best-chatbot-examples-to-improve-customer-service-in-2019': '/blog/chatbot-examples-to-improve-customer-service',
    '/7-benefits-of-using-chatbots-for-your-business': '/blog/10-benefits-of-using-chatbots-for-your-business',
    '/blog/six-reasons-to-fall-in-love-with-react': '/blog/benefits-of-react',
    '/tag/marketing': '/blog/marketing',
  }[pathRedirectFrom];

  if (!newUrl) {
    return null;
  }

  return (`${newUrl}${query}`);
};

module.exports = {
  safePageRedirect,
};
