const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const dotenv = require('dotenv');
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

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.urlencoded({ extended: false }));
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
