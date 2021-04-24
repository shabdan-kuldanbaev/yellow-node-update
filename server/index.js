const express = require('express');
const next = require('next');
const dotenv = require('dotenv');
const multer = require('multer');
const compression = require('compression');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const {
  httpsRedirect,
  clearUrlRedirect,
  oldUrlRedirect,
} = require('./middleware/redirect');
const formDataHelper = require('./contact/formDataHelper');
const subscribeHelper = require('./subscribe/subscribeHelper');
const { processes } = require('./utils/data');
const { CONTACT_FORM_API_URL } = require('./utils/constants');

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

    server.use(httpsRedirect);
    server.use(clearUrlRedirect);
    server.use(oldUrlRedirect);

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
          `${CONTACT_FORM_API_URL}/upload-url`,
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
        res.status(502);
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
