import Cors from 'cors';
import { runMiddleware } from 'utils/helper';
import { sendFormData } from 'utils/formDataHelper';
import { sendDataPipedrive } from 'utils/pipedrive/pipedriveHelper';
import { sendAutoReplyEmail } from 'utils/contactUs';

const cors = Cors({ methods: ['POST'] });

const handler = async (req, res) => {
  await runMiddleware(req, res, cors);
  await runMiddleware(req, res, req.formData());

  // eslint-disable-next-line
  console.log(req.body);

  await sendAutoReplyEmail(req.body.email);
  await sendFormData(req, res);
  await sendDataPipedrive(req, res);
};

export default handler;
