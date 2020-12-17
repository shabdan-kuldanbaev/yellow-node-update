const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const multer = require('multer');
const compression = require('compression');
const path = require('path');
const cors = require('cors');

dotenv.config('./env');

const dev = process.env.NODE_ENV !== 'production';
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
const upload = multer();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(cors());
    server.use(express.static(path.join(__dirname, 'build')));
    server.use(bodyParser.urlencoded());
    server.use(bodyParser.json());
    server.use(compression());

    server.post('/send', upload.array('files'), (req, res) => {
      const transporter = nodemailer.createTransport({
        service: 'Yandex',
        auth: { user, pass },
      });

      const {
        files,
        body: {
          fullName,
          email,
          projectDescription,
          isSendNDAChecked,
          projectBudget,
        },
      } = req;

      let attachments;
      if (files) {
        attachments = files.map((file) => ({
          filename: `${file.originalname}`,
          content: file.buffer,
        }));
      }

      const text = `${fullName ? `Contact name: ${fullName} \n` : ''}`
        + `${email ? `Contact email: ${email}\n` : ''}`
        + `${projectDescription ? `Project description: ${projectDescription} \n` : ''}`
        + `${isSendNDAChecked ? 'Send NDA \n' : ''}`
        + `${projectBudget ? `Project budget: ${projectBudget} \n` : ''}`;

      const mailOptions = {
        from: user,
        to: user,
        subject: 'New Message',
        text,
        attachments,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.json(JSON.stringify(false));
        } else {
          res.json(JSON.stringify(true));
        }
      });
    });

    server.post('/subscribe', (req, res) => {
      const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: '587',
        auth: { user, pass },
        secure: false,
        tls: { ciphers: 'SSLv3' },
      });

      const { email } = req.body;

      const mailOptions = {
        from: user,
        to: user,
        subject: 'New Message',
        text: `\nContact email: ${email} `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.sendStatus(error.responseCode);
          console.log(error);
        } else {
          res.json(JSON.stringify(true));
        }
      });
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
