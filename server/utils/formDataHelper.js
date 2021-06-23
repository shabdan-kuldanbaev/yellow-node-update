const dotenv = require('dotenv');
const axios = require('axios');
const FormData = require('form-data');
const errorHelper = require('./error');
const ipHelper = require('./ip');

dotenv.config('./env');

module.exports.sendFormData = async (req, res) => {
  try {
    const {
      name,
      email,
      description,
      projectBudget,
      attachments,
      clientId,
    } = req.body;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('client_id', clientId);
    formData.append('client_ip', ipHelper.getClientIp(req));

    if (projectBudget) {
      formData.append('budget', +projectBudget);
    }

    if (attachments) {
      if (typeof attachments === 'string') {
        formData.append('attachments[]', attachments);
      } else {
        attachments.forEach((file) => {
          formData.append('attachments[]', file);
        });
      }
    }

    const { status, data } = await axios.post(
      `${process.env.ERP_API_URL}/contact-form`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.ERP_AUTH_TOKEN}`,
          ...formData.getHeaders(),
        },
      },
    );

    res.status(status).send(JSON.stringify(data));
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the sendFormData function',
    });
    res.status(500).json({ error: error.message });
  }
};
