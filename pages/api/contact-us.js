import Cors from 'cors';
import { withSentry } from '@sentry/nextjs';
import formidable from 'formidable';
import { runMiddleware } from 'utils/helper';
import formDataHelper from 'utils/formDataHelper';
import errorHelper from 'utils/error';

const cors = Cors({ methods: ['POST'] });
const form = formidable({ multiples: true });

const bodyParser = async (req, _, next) => {
  form.parse(req, (err, fields, files) => {
    if (!err) {
      req.body = fields; // sets the body field in the request object
      req.files = files; // sets the files field in the request object
    } else {
      errorHelper.handleError({
        err,
        message: 'Error in the bodyParser function',
      });
    }

    next(); // continues to the next middleware or to the route
  });
};

const handler = async (req, res) => {
  await runMiddleware(req, res, cors);
  await runMiddleware(req, res, bodyParser);

  await formDataHelper.sendFormData(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withSentry(handler);
