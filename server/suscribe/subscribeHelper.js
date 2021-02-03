const dotenv = require('dotenv');
const md5 = require('md5');
const subscribeUtils = require('./subscribeUtils');

dotenv.config('./env');

module.exports.subscribe = async (req, res) => {
  const { email } = req.body;
  const subscriberHash = md5(email);

  await subscribeUtils.getSubscriber(subscriberHash, async (err, result) => {
    if (err) {
      await subscribeUtils.addSubscriber(subscriberHash, email, res);
    } else {
      if (result.status === 'subscribed') {
        res.status(201).send({ message: "Seems we're already in your inbox!", unique_id: result.id });
      }

      if (result.status === 'unsubscribed') {
        await subscribeUtils.addSubscriber(subscriberHash, email, res);
      }
    }
  });
};

module.exports.unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;
    const subscriberHash = md5(email);

    await subscribeUtils.unsubscribe(subscriberHash, res);
  } catch (err) {
    console.log(err);
  }
};

module.exports.getMember = async (req, res) => {
  try {
    const { id } = req.params;

    await subscribeUtils.getSubscriber(id, async (err, result) => {
      if (err) {
        res.status(502).json(JSON.stringify(false));
      } else {
        if (result.status === 'subscribed') {
          res.status(201).json(JSON.stringify(true));
        }

        if (result.status === 'unsubscribed') {
          res.status(502).json(JSON.stringify(false));
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};
