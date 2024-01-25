import Cors from 'cors';

import { runMiddleware } from 'utils/helper';
import subscribeHelper from 'utils/subscribe/subscribeHelper';

const cors = Cors({ methods: ['POST'] });

const handler = async (req, res) => {
  await runMiddleware(req, res, cors);

  await subscribeHelper.subscribe(req, res);
};

export default handler;
