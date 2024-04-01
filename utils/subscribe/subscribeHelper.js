import dotenv from 'dotenv';
import {
  addSubscriber,
  addTagsToSubscriber,
  getSubscriber,
} from './subscribeUtils';

dotenv.config('./env');

const subscribe = async ({ email, tags }) => new Promise((resolve, reject) => {
  const onAddSubscriberRequestDone = (err) => {
    if (err) {
      reject(new Error({ message: 'Sorry, there was an error sending you email. Please double check your email adress', status: 502 }));
    }

    addTagsToSubscriber(email, tags);

    resolve({ message: 'Great! Awesome content is coming your way', status: 201 });
  };

  const onGetSubscriberRequestDone = (err, result) => {
    if (err || result.status === 'unsubscribed') {
      addSubscriber(email, onAddSubscriberRequestDone);
    } else {
      addTagsToSubscriber(email, tags);

      resolve({ status: 201, message: "Seems we're already in your inbox!" });
    }
  };

  getSubscriber(email, onGetSubscriberRequestDone);
});

export default { subscribe };
