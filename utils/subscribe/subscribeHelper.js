import dotenv from 'dotenv';
import { addSubscriber, getSubscriber } from './subscribeUtils';
import { handleError } from '../error';

dotenv.config('./env');

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    getSubscriber(email, (err, result) => {
      if (err || result.status === 'unsubscribed') {
        addSubscriber(email, res);
      } else {
        res.status(201).send("Seems we're already in your inbox!");
      }
    });
  } catch (error) {
    res.status(500).send(error);

    handleError({
      error,
      message: 'Error in the subscribe function',
    });
  }
};

export default { subscribe };
