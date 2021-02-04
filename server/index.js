const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const dotenv = require('dotenv');
const multer = require('multer');
const compression = require('compression');
const path = require('path');
const cors = require('cors');
const {
  httpsRedirect,
  clearUrlRedirect,
  oldUrlRedirect,
} = require('./middleware/redirect');
const mailhelper = require('./mail/mailhelper');
const subscribeHelper = require('./suscribe/subscribeHelper');
const { getFeedBackMessage } = require('./mail/messages');
const { processes } = require('./utils/data');

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

    server.use(httpsRedirect);
    server.use(clearUrlRedirect);
    server.use(oldUrlRedirect);

    server.use(cors());
    server.use(express.static(path.join(__dirname, 'public')));
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    server.use(compression());

    server.post('/send', upload.array('files'), async (req, res) => {
      try {
        await mailhelper.sendMail(getFeedBackMessage(req), res);
      } catch (err) {
        console.log(err);
      }
    });

    server.post('/subscribe', async (req, res) => {
      try {
        await subscribeHelper.subscribe(req, res);
      } catch (err) {
        console.log(err);
      }
    });

    server.get('/json', (req, res) => {
      res.status(200).json(processes);
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
