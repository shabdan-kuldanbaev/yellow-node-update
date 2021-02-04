const dotenv = require('dotenv');
const subscribeUtils = require('./subscribeUtils');

dotenv.config('./env');

module.exports.subscribe = async (req, res) => {
  const { email } = req.body;

  await subscribeUtils.getSubscriber(email, async (err, result) => {
    if (err) {
      await subscribeUtils.addSubscriber(email, res);
    } else {
      if (result.status === 'subscribed') {
        res.status(201).send("Seems we're already in your inbox!");
      }

      if (result.status === 'unsubscribed') {
        await subscribeUtils.addSubscriber(email, res);
      }
    }
  });
};
