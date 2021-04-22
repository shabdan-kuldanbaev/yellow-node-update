const dotenv = require('dotenv');
const axios = require('axios');
const FormData = require('form-data');

dotenv.config('./env');

module.exports.sendContact = async (req, res) => {
  try {
    const {
      name,
      email,
      description,
      isSendNDAChecked,
      projectBudget,
      attachments,
      clientId,
    } = req.body;

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('description', description);
    data.append('client_id', clientId);

    if (projectBudget) data.append('budget', +projectBudget);

    if (attachments && attachments.lenght) {
      attachments.forEach((file) => data.append('attachments[]', file));
    }

    const result = await axios.post(
      'https://yellow-erp-backend-dev.herokuapp.com/api/v1/integrations/contact-form',
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.ERR_AUTH_TOKEN}`,
          ...data.getHeaders(),
        },
      },
    );

    res.status(201).send(JSON.stringify(result.data));
  } catch (err) {
    res.status(502).send(JSON.stringify(err));
  }
};
