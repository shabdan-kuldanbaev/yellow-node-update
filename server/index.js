const express = require('express');
const next = require('next');
const dotenv = require('dotenv');
const multer = require('multer');
const compression = require('compression');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const {
  // redirectToCustomDomain,
  httpsRedirect,
  clearUrlRedirect,
  urlRedirect,
} = require('./middleware/redirect');
const subscribeHelper = require('./subscribe/subscribeHelper');
const { processes } = require('./utils/processes');
const formDataHelper = require('./utils/formDataHelper');

dotenv.config('./env');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
const authToken = process.env.ERP_AUTH_TOKEN || '';
const upload = multer();

app
  .prepare()
  .then(() => {
    const server = express();

    // server.use(redirectToCustomDomain); TODO
    server.use(httpsRedirect);
    server.use(clearUrlRedirect);
    server.use(urlRedirect);

    server.use(cors());
    server.use(express.static(path.join(__dirname, 'public')));
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(compression());

    server.post('/contact-us', upload.array('attachments'), async (req, res) => {
      try {
        await formDataHelper.sendFormData(req, res);
      } catch (err) {
        console.error(err);
      }
    });

    server.post('/subscribe', async (req, res) => {
      try {
        await subscribeHelper.subscribe(req, res);
      } catch (err) {
        console.error(err);
      }
    });

    server.get('/json', (req, res) => {
      res.status(200).json(processes);
    });

    server.post('/signed-file-url', async (req, res) => {
      try {
        const { fileName } = req.body;

        const { data: { signed_url } } = await axios.post(
          `${process.env.ERP_API_URL}/contact-form/upload-url`,
          { file_name: fileName },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );

        res.status(200).send(JSON.stringify(signed_url));
      } catch (err) {
        res.status(502).send(JSON.stringify(err));
      }
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err;

      // eslint-disable-next-line no-console
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
