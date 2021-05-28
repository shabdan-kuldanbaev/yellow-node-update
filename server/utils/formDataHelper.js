const dotenv = require('dotenv');
const axios = require('axios');
const FormData = require('form-data');
const { handleError } = require('./error');

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

    const { data } = await axios.post(
      `${process.env.ERP_API_URL}/contact-form`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.ERP_AUTH_TOKEN}`,
          ...formData.getHeaders(),
        },
      },
    );

    res.status(201).send(JSON.stringify(data));
  } catch (error) {
    handleError({ error, message: 'sendFormData function is failed' });
    res.status(500).json({ error: error.message });
  }
};
