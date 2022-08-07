const cors = require('cors');
const get = require('lodash/get');
const { handler } = require('./utils/Contentful/handler');
const ContentfulManagement = require('./utils/Contentful/management');

const contentfulManagement = new ContentfulManagement({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

(async () => {
  const contentfulEnvironments = await contentfulManagement.getEnvironments();
  console.log(get(contentfulEnvironments, 'items'));
  if (get(contentfulEnvironments, 'items').length < 3) {
    console.log('AWS Lambda was run.');
    await handler();
  } else {
    console.log('AWS Lambda is working. Try a little later.');
    console.log('AWS Lambda is working. Try a little later.');
  }
})();
