import Cors from 'cors';
import { withSentry } from '@sentry/nextjs';
import formidable from 'formidable';
import { formParser, runMiddleware } from 'utils/helper';
import formDataHelper from 'utils/formDataHelper';
import { sendDataPipedrive } from 'utils/pipedrive/pipedriveHelper';

const cors = Cors({ methods: ['POST'] });
const form = formidable({ multiples: true });

const handler = async (req, res) => {
  await runMiddleware(req, res, cors);
  await runMiddleware(req, res, formParser(form));

  await formDataHelper.sendFormData(req, res);
  await sendDataPipedrive(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withSentry(handler);
