import dotenv from 'dotenv';
import axios from 'axios';
import FormData from 'form-data';
import { handleError } from './error';
import { getClientIp } from './ip';

dotenv.config('./env');

export async function sendFormData(req, res) {
  try {
    console.log('BEGIN sendFormData');
    const {
      name,
      email,
      phone,
      description,
      projectBudget,
      attachments,
      clientId,
    } = req.body;
    console.log('sendFormData: finished fields parsing');

    const concatDescription = `${description} [Phone number: ${phone}]`;

    console.log('sendFormData: started forming fd for erp');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('description', concatDescription);
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

    console.log('sendFormData: finished forming fd for erp');
    console.log('sendFormData: started sending to erp request');

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

    console.log('sendFormData: finished sending to erp request');

    if (status === 200) {
      return data;
    }
  } catch (error) {
    console.error('sendFormData error: ', error);
    handleError({
      error,
      message: 'Error in the sendFormData function',
    });
    res.status(500).json({ error: error.message });
  }
}
