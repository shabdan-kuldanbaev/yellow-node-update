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
const contacthelper = require('./contact/contacthelper');
const subscribeHelper = require('./subscribe/subscribeHelper');
const { processes } = require('./utils/data');

dotenv.config('./env');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
const authToken = process.env.ERR_AUTH_TOKEN || '';
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

    server.post('/send', upload.array('attachments'), async (req, res) => {
      try {
        await contacthelper.sendContact(req, res);
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

    server.post('/get-signed-url', async (req, res) => {
      try {
        const { fileName } = req.body;
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        };

        const { data: { signed_url } } = await axios.post(
          'https://yellow-erp-backend-dev.herokuapp.com/api/v1/integrations/contact-form/upload-url',
          { file_name: fileName },
          config,
        );

        res.status(200).send(JSON.stringify(signed_url));
      } catch (err) {
        console.error(err);
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
