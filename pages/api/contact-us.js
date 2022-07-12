import Cors from 'cors';
import { withSentry } from '@sentry/nextjs';
import { runMiddleware } from 'utils/helper';
import formDataHelper from 'utils/formDataHelper';

const cors = Cors({ methods: ['POST'] });

const handler = async (req, res) => {
  await runMiddleware(req, res, cors);

  await formDataHelper.sendFormData(req, res);
};

export default withSentry(handler);
