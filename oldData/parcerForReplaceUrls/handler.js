const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const get = require('lodash/get');
const { handler } = require('./Contentful/handler');
const ContentfulManagement = require('./Contentful/management');
dotenv.config('./env');

const contentfulManagement = new ContentfulManagement({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

(async () => {
  const contentfulEnvironments = await contentfulManagement.getEnvironments();
  console.log(get(contentfulEnvironments, 'items'));
  if (get(contentfulEnvironments, 'items').length <= 3) {
    console.log('AWS Lambda was run.');
    await handler();
  } else {
    console.log('AWS Lambda is working. Try a little later.');
    console.log('AWS Lambda is working. Try a little later.');
  }
})();