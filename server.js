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
        auth: {
          user: 'kseniya.nestsiarovich@yellow.id',
          pass: '11235813roseWood',
        },
      });

      const {
        fullName,
        email,
        projectDescription,
        projectBudget,
      } = req.body;

      const { files } = req;

      let attachments;
      if (files) {
        attachments = files.map((file) => ({
          filename: `${file.originalname}`,
          content: file.buffer,
        }));
      }

      let text = '';
      text += fullName ? `Contact name: ${fullName} \n` : '';
      text += email ? `Contact email: ${email}\n` : '';
      text += projectDescription ? `Project description: ${projectDescription} \n` : '';
      text += projectBudget ? `Project budget: ${projectBudget} \n` : ''; // undefined


      const mailOptions = {
        from: 'kseniya.nestsiarovich@yellow.id',
        to: 'kseniya.nestsiarovich@yellow.id',
        subject: 'Kseniya.nestsiarovich.id - New Message',
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
        auth: {
          user: 'kseniya.nestsiarovich@yellow.id',
          pass: '11235813roseWood',
        },
      });

      const { email } = req.body;

      const mailOptions = {
        from: 'kseniya.nestsiarovich@yellow.id',
        to: 'kseniya.nestsiarovich@yellow.id',
        subject: 'Kseniya.nestsiarovich.id - New Message',
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
