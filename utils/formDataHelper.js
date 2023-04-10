import dotenv from 'dotenv';
import axios from 'axios';
import FormData from 'form-data';
import { handleError } from './error';
import { getClientIp } from './ip';

dotenv.config('./env');

export async function sendFormData(req, res) {
  try {
    const {
      name,
      email,
      // phone,
      description,
      projectBudget,
      attachments,
      clientId,
    } = req.body;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    // formData.append('phone', phone);
    formData.append('description', description);
    formData.append('client_id', clientId);
    formData.append('client_ip', getClientIp(req));

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

    if (status === 200) return data;
  } catch (error) {
    handleError({
      error,
      message: 'Error in the sendFormData function',
    });
    res.status(500).json({ error: error.message });
  }
}
