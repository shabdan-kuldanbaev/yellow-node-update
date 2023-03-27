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
        isSubscribed,
        message,
        ...args
      }) {
        if (typeof isSubscribed !== 'undefined' || typeof message !== 'undefined') {
          return { data: { isSubscribed, message } };
        }

        try {
          const response = await API.subscribe(args);

          gaHelper.trackEvent(
            'Subscribe',
            'Send',
            pathname,
          );

          setDataToLocalStorageWithExpire('isSubscribed', true, hoursToMs(24));

          return {
            data: {
              isSubscribed: true,
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
          message: `New Contact Form submit: ${JSON.stringify(args)}`,
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
