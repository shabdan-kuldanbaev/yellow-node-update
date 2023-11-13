import Cors from 'cors';
import { withSentry } from '@sentry/nextjs';
import formidable from 'formidable';
import { formParser, runMiddleware } from 'utils/helper';
import { sendFormData } from 'utils/formDataHelper';
import { sendDataPipedrive } from 'utils/pipedrive/pipedriveHelper';
import { sendAutoReplyEmail } from 'utils/contactUs';

const cors = Cors({ methods: ['POST'] });
const form = formidable({ multiples: true });

const handler = async (req, res) => {
  // await runMiddleware(req, res, cors);
  // await runMiddleware(req, res, formParser(form));

  // await sendAutoReplyEmail(req.body.email);
  // await sendFormData(req, res);
  // await sendDataPipedrive(req, res);
  res.status(200).send({ message: 'qwe' });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withSentry(handler);
