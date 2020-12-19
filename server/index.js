const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const dotenv = require('dotenv');
const multer = require('multer');
const compression = require('compression');
const mailhelper = require('./mail/mailhelper');
const { getFeedBackMessage, getSubscribeMessage } = require('./mail/messages');

dotenv.config('./env');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
const upload = multer();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.urlencoded());
    server.use(bodyParser.json());
    server.use(compression());

    server.post('/send', upload.array('files'), async (req, res) => {
      await mailhelper.sendMail(getFeedBackMessage(req), res);
    });

    server.post('/subscribe', async (req, res) => {
      await mailhelper.sendMail(getSubscribeMessage(req), res);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
