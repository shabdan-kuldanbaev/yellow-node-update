import Cors from 'cors';
import { processes } from 'utils/processes';
import { runMiddleware } from 'utils/helper';

const cors = Cors({ methods: ['GET'] });

const handler = async (req, res) => {
  await runMiddleware(req, res, cors);

  res.status(200).json(processes);
};

export default handler;
