import { API } from 'utils/api';
import gaHelper from 'utils/ga';
import { handleMessage } from 'utils/error';
import { hoursToMs, setDataToLocalStorageWithExpire } from 'utils/helper';
import baseApi from '.';

export const SUBSCRIPTION_CASH_KEY = 'DATA_SENDING_API/SUBSCRIPTION';

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

    contact: builder.mutation({
      async queryFn(args) {
        handleMessage({
          message: `New Contact Form submit: ${JSON.stringify(args)}`,
        });

        try {
          const response = API.sendEmail(args);

          gaHelper.trackEvent(
            'Contact Form',
            'Send',
          );

          return { data: response };
        } catch (e) {
          return { error: e };
        }
      },
    }),
  }),
});

export const {
  useSubscribeMutation,
  useContactMutation,
} = dataSendingApi;

export default dataSendingApi;
