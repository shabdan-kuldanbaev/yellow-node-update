const contentful = require('contentful');
dotenv.config('./env');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  environment: process.env.CONTENTFUL_ENV, // defaults to 'master' if not set
  accessToken: process.env.CONTENTFUL_TOKEN
});

client.getAsset('7emvD2AFePSNV2SA5HY4ze')
.then((asset) => console.log(asset))
.catch(console.error);