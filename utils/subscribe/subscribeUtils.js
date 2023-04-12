import dotenv from 'dotenv';
import Mailchimp from 'mailchimp-api-v3';
import md5 from 'md5';
import { handleError } from '../error';

dotenv.config('./env');

const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);
const membersPath = (email) => `/lists/${process.env.MAILCHIMP_LIST_ID}/members/${md5(email)}`;

export function getSubscriber(email, callback) {
  try {
    const getSubscriberOptions = {
      method: 'get',
      path: membersPath(email),
    };

    mailchimp.request(getSubscriberOptions, callback);
  } catch (error) {
    handleError({
      error,
      message: 'Error in the getSubscriber function',
    });
  }
}

export function addSubscriber(email, res) {
  try {
    const addSubscriberOptions = {
      method: 'put',
      path: membersPath(email),
      body: {
        email_address: email,
        status: 'subscribed',
      },
    };

    mailchimp.request(addSubscriberOptions, (error) => {
      if (error) {
        res.status(502).send('Sorry, there was an error sending you email. Please double check your email adress');
      } else {
        res.status(201).send('Great! Awesome content is coming your way');
      }
    });
  } catch (error) {
    handleError({
      error,
      message: 'Error in the addSubscriber function',
    });
  }
}
