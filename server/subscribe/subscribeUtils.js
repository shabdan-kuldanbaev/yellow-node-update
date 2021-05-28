const dotenv = require('dotenv');
const Mailchimp = require('mailchimp-api-v3');
const md5 = require('md5');
const { handleError } = require('../utils/error');

dotenv.config('./env');

const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);
const membersPath = (email) => `/lists/${process.env.MAILCHIMP_LIST_ID}/members/${md5(email)}`;

module.exports.getSubscriber = async (email, callback) => {
  try {
    const getSubscriberOptions = {
      method: 'get',
      path: membersPath(email),
    };

    await mailchimp.request(getSubscriberOptions, callback);
  } catch (error) {
    handleError({ error, message: 'getSubscriber function is failed' });
  }
};

module.exports.addSubscriber = async (email, res) => {
  try {
    const addSubscriberOptions = {
      method: 'put',
      path: membersPath(email),
      body: {
        email_address: email,
        status: 'subscribed',
      },
    };

    await mailchimp.request(addSubscriberOptions, (error) => {
      if (error) {
        res.status(502).send('Sorry, there was an error sending you email. Please double check your email adress');
      } else {
        res.status(201).send('Great! Awesome content is coming your way');
      }
    });
  } catch (error) {
    handleError({ error, message: 'addSubscriber function is failed' });
  }
};
