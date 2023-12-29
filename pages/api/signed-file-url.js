import Cors from 'cors';
import axios from 'axios';
import { runMiddleware } from 'utils/helper';

const authToken = process.env.ERP_AUTH_TOKEN || '';

const cors = Cors({ methods: ['POST'] });

export const config = { api: { bodyParser: true } };

const handler = async (req, res) => {
  await runMiddleware(req, res, cors);

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
};

export default handler;
