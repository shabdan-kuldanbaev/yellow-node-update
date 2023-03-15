import { API } from 'utils/api';
import gaHelper from 'utils/ga';
import errorHelper from 'utils/error';
import baseApi from '.';

const dataSendingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscribe: builder.mutation({
      async queryFn({ pathname, ...args }) {
        try {
          const response = API.subscribe(args);

          gaHelper.trackEvent(
            'Subscribe',
            'Send',
            pathname,
          );

          return { data: response };
        } catch (e) {
          return { error: e };
        }
      },
    }),

    contact: builder.mutation({
      async queryFn(args) {
        errorHelper.handleMessage({
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

export default dataSendingApi;
