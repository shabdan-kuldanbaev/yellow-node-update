const Mailchimp = require('mailchimp-api-v3');

const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);
const membersPath = (subscriberHash) => `/lists/${process.env.MAILCHIMP_LIST_ID}/members/${subscriberHash}`;

module.exports.getSubscriber = async (subscriberHash, callback) => {
  try {
    const getSubscriberOptions = {
      method: 'get',
      path: membersPath(subscriberHash),
    };

    await mailchimp.request(getSubscriberOptions, callback);
  } catch (err) {
    console.log(err);
  }
};

module.exports.addSubscriber = async (subscriberHash, email, res) => {
  try {
    const addSubscriberOptions = {
      method: 'put',
      path: membersPath(subscriberHash),
      body: {
        email_address: email,
        status: 'subscribed',
      },
    };

    await mailchimp.request(addSubscriberOptions, (error, result) => {
      if (error) {
        res.status(502).send({ message: 'Sorry, there was an error sending you email. Please double check your email adress' });
      } else {
        res.status(201).send({ message: 'Great! Awesome content is coming your way', unique_id: result.id });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.unsubscribe = async (subscriberHash, res) => {
  try {
    const deleteSubscriberOptions = {
      method: 'put',
      path: membersPath(subscriberHash),
    };

    await mailchimp.request(deleteSubscriberOptions, async (err) => {
      if (err) {
        res.status(502).json(JSON.stringify(false));
      } else {
        res.status(201).json(JSON.stringify(true));
      }
    });
  } catch (err) {
    console.log(err);
  }
};
