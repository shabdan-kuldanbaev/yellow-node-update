import dotenv from 'dotenv';
import {
  addSubscriber,
  addTagsToSubscriber,
  getSubscriber,
} from './subscribeUtils';
import { handleError } from '../error';

dotenv.config('./env');

const subscribe = async (req, res) => {
  try {
    const { email, tags } = req.body;

    const onAddSubscriberRequestDone = (err) => {
      if (err) {
        res.status(502).send('Sorry, there was an error sending you email. Please double check your email adress');
      } else {
        addTagsToSubscriber(email, tags);
        res.status(201).send('Great! Awesome content is coming your way');
      }
    };

    const onGetSubscriberRequestDone = (err, result) => {
      if (err || result.status === 'unsubscribed') {
        addSubscriber(email, onAddSubscriberRequestDone);
      } else {
        addTagsToSubscriber(email, tags);
        res.status(201).send("Seems we're already in your inbox!");
      }
    };

    getSubscriber(email, onGetSubscriberRequestDone);
  } catch (error) {
    res.status(500).send(error);

    handleError({
      error,
      message: 'Error in the subscribe function',
    });
  }
};

export default { subscribe };
