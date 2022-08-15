const contentful = require('contentful');
dotenv.config('./env');

const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENV, // defaults to 'master' if not set
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN
});

client.getAsset('7emvD2AFePSNV2SA5HY4ze')
.then((asset) => console.log(asset))
.catch(console.error);