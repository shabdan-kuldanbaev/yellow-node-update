import { API } from 'utils/api';
import gaHelper from 'utils/ga';
import { handleMessage } from 'utils/error';
import {
  getFeedbackFormData,
  hoursToMs,
  setDataToLocalStorageWithExpire,
} from 'utils/helper';
import baseApi from '.';

export const SUBSCRIPTION_CASH_KEY = 'DATA_SENDING_API/SUBSCRIPTION';
export const CONTACT_CASH_KEY = 'DATA_SENDING_API/CONTACT';

const dataSendingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscribe: builder.mutation({
      async queryFn({
        pathname,
        pageClusters = [],
        savedSubscriptionEmail,
        ...args
      }) {
        const isRequestRequired = pageClusters.length
        || typeof savedSubscriptionEmail === 'undefined'; // check if is not initial call from _app.jsx

        if (!isRequestRequired) {
          return {
            data: {
              isSubscribed: !!savedSubscriptionEmail,
              subscriptionEmail: savedSubscriptionEmail,
            },
          };
        }

        try {
          const response = await API.subscribe({ ...args, tags: pageClusters });

          gaHelper.trackEvent(
            'Subscribe',
            'Send',
            pathname,
          );

          setDataToLocalStorageWithExpire('subscriptionEmail', args.email, hoursToMs(24));

          return {
            data: {
              isSubscribed: true,
              subscriptionEmail: args.email,
              message: response.data,
            },
          };
        } catch (e) {
          return { error: e };
        }
      },
    }),

    sendContactForm: builder.mutation({
      async queryFn({ isSent, ...args }) {
        if (typeof isSent !== 'undefined') {
          return { data: { sent: isSent } };
        }

        handleMessage({
          message: `New Contact Form Submit\n
          From: ${args.name}
          Email: ${args.email}
          Phone: ${args.phone}
          Budget: ${args.projectBudget}
          Description: ${args.description}
          Files: [${args.attachments.map((file) => `${file}\n`)}]
        `,
        });

        try {
          const response = await API.sendEmail(getFeedbackFormData(args));

          gaHelper.trackEvent(
            'Contact Form',
            'Send',
          );

          return { data: { sent: response.data } };
        } catch (e) {
          return { error: e };
        }
      },
    }),
  }),
});

export const {
  useSubscribeMutation,
  useSendContactFormMutation,
} = dataSendingApi;

export default dataSendingApi;
