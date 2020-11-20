const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const multer = require('multer');

// TODO const { articlesData } = require('./utils/utils/data');
// const priority = {
//   low: 'low',
//   high: 'high',
//   medium: 'medium',
// };

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

    server.use(bodyParser.urlencoded());
    server.use(bodyParser.json());

    // TODO server.get('/blog', async (req, res) => {
    //   let response = [];
    //   const { category: cat, limit: lim, page } = req.query;
    //   const [skip, limit, category] = [page, lim, cat];
    //   const [leftEdge, rightEdge] = [(skip - 1) * limit, skip * limit];

    //   if (category === 'latest') {
    //     const high = articlesData.filter((article) => article.priority === priority.high);
    //     const medium = articlesData.filter((article) => article.priority === priority.medium);
    //     const withoutHighAndMediumArray = articlesData.filter((article) => article.priority !== priority.high && article.priority !== priority.medium);
    //     const inOrder = [...high, ...medium, ...withoutHighAndMediumArray];

    //     response = await inOrder.filter((article, index) => index >= leftEdge && index < rightEdge);
    //     res.status(200).send({ response });
    //   }

    //   response = await articlesData
    //     .filter((article) => article.category === category)
    //     .filter((article, index) => index >= leftEdge && index < rightEdge);

    //   res.status(200).send({ response });
    // });

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
        service: 'Yandex',
        auth: { user, pass },
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
          res.json(error);
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
