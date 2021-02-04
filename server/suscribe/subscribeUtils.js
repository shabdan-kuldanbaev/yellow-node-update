const Mailchimp = require('mailchimp-api-v3');
const md5 = require('md5');

const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);
const membersPath = (subscriberHash) => `/lists/${process.env.MAILCHIMP_LIST_ID}/members/${subscriberHash}`;

module.exports.getSubscriber = async (email, callback) => {
  try {
    const subscriberHash = md5(email);
    const getSubscriberOptions = {
      method: 'get',
      path: membersPath(subscriberHash),
    };

    await mailchimp.request(getSubscriberOptions, callback);
  } catch (err) {
    console.log(err);
  }
};

module.exports.addSubscriber = async (email, res) => {
  try {
    const subscriberHash = md5(email);
    const addSubscriberOptions = {
      method: 'put',
      path: membersPath(subscriberHash),
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
  } catch (err) {
    console.log(err);
  }
};
