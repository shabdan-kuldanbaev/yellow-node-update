import dotenv from 'dotenv';
import Mailchimp from 'mailchimp-api-v3';
import md5 from 'md5';
import { handleError } from '../error';

dotenv.config('./env');

const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);
const membersPath = (email) => `/lists/${process.env.MAILCHIMP_LIST_ID}/members/${md5(email)}`;
const memberTagsPath = (email) => `${membersPath(email)}/tags`;

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

export function addSubscriber(email, callback) {
  try {
    const addSubscriberOptions = {
      method: 'put',
      path: membersPath(email),
      body: {
        email_address: email,
        status: 'subscribed',
      },
    };

    mailchimp.request(addSubscriberOptions, callback);
  } catch (error) {
    handleError({
      error,
      message: 'Error in the addSubscriber function',
    });
  }
}

export function addTagsToSubscriber(email, tags, callback) {
  try {
    const addTagsOptions = {
      method: 'post',
      path: memberTagsPath(email),
      body: {
        tags: tags.map((tag) => ({ name: tag, status: 'active' })),
      },
    };

    mailchimp.request(addTagsOptions, callback);
  } catch (error) {
    handleError({
      error,
      message: 'Error in the addTagsToSubscriber function',
    });
  }
}
