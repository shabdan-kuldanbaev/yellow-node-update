const express = require('express');
const next = require('next');
const dotenv = require('dotenv');
const multer = require('multer');
const compression = require('compression');
const Sentry = require('@sentry/node');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const {
  httpsRedirect,
  clearUrlRedirect,
  trailingSlashRedirect,
  wwwRedirect,
  customDomainRedirect,
  pageRedirect,
  multiSlashRedirect,
  upperCaseRedirect,
  indexDirRedirect,
} = require('./middleware/redirect');
const subscribeHelper = require('./subscribe/subscribeHelper');
const { processes } = require('./utils/processes');
const formDataHelper = require('./utils/formDataHelper');
const errorHelper = require('./utils/error');

dotenv.config('./env');

const {
  NODE_ENV,
  PORT,
  ERP_AUTH_TOKEN,
  SENTRY_DNS,
} = process.env;

const dev = NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = PORT || 3000;
const authToken = ERP_AUTH_TOKEN || '';
const upload = multer();

Sentry.init({
  debug: dev,
  dsn: SENTRY_DNS,
  environment: NODE_ENV,
});

app
  .prepare()
  .then(() => {
    const server = express();

    // The request handler must be the first middleware on the app
    server.use(Sentry.Handlers.requestHandler());

    server.use(indexDirRedirect);
    server.use(upperCaseRedirect);
    server.use(httpsRedirect);
    server.use(customDomainRedirect);
    server.use(wwwRedirect);
    server.use(trailingSlashRedirect);
    server.use(clearUrlRedirect);
    server.use(pageRedirect);
    server.use(multiSlashRedirect);

    server.use(cors());
    server.use(express.static(path.join(__dirname, 'public')));
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(compression());

    server.post('/contact-us', upload.array('attachments'), async (req, res) => {
      try {
        await formDataHelper.sendFormData(req, res);
      } catch (error) {
        errorHelper.handleError({
          error,
          message: 'Error in the server.post of /contact-us',
        });
      }
    });

    server.post('/subscribe', async (req, res) => {
      try {
        await subscribeHelper.subscribe(req, res);
      } catch (error) {
        errorHelper.handleError({
          error,
          message: 'Error in the server.post of /subscribe',
        });
      }
    });

    server.get('/json', (req, res) => {
      res.status(200).json(processes);
    });

    server.post('/signed-file-url', async (req, res) => {
      try {
        const { data: { signed_url } } = await axios.post(
          `${process.env.ERP_API_URL}/contact-form/upload-url`,
          { file_name: req.body.fileName },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );

        res.status(200).send(JSON.stringify(signed_url));
      } catch (error) {
        errorHelper.handleError({
          error,
          message: 'Error in the server.post of /signed-file-url',
        });
        res.status(500).json({ error: error.message });
      }
    });

    server.get('*', (req, res) => {
      res.setHeader(
        'Cache-Control',
        'public, max-age=864000, immutable',
      );

      handle(req, res);
    });

    // The error handler must be before any other error middleware and after all controllers
    server.use(Sentry.Handlers.errorHandler());

    server.listen(port, '0.0.0.0', (err) => {
      if (err) throw err;

      // eslint-disable-next-line no-console
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
