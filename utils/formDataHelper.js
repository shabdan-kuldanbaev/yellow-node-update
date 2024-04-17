import dotenv from 'dotenv';
import axios from 'axios';
import FormData from 'form-data';
import { NextResponse } from 'next/server';
import { handleError } from './error';
import { getClientIp } from './ip';

dotenv.config('./env');

export async function sendFormData(fields) {
  try {
    const {
      ip,
      name,
      email,
      phone = 'not sent',
      description,
      projectBudget,
      attachments,
      clientId,
    } = fields;

    const concatDescription = `${description} [Phone number: ${phone}]`;
    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('description', concatDescription);
    formData.append('client_id', clientId);
    formData.append('client_ip', ip);

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

    if (status === 200) {
      return data;
    }
  } catch (error) {
    console.error('sendFormData error: ', error);
    handleError({
      error,
      message: 'Error in the sendFormData function',
    });

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
