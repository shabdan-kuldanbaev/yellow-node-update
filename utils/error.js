import * as SentryNode from '@sentry/node';
import * as SentryBrowser from '@sentry/browser';

const isServer = typeof window === 'undefined';
const isDev = process.env.NODE_ENV !== 'production';

const handleError = ({ error = {}, ...extra } = {}) => {
  if (isServer) {
    SentryNode.captureException(error, {
      extra: {
        ...extra,
        message: `Next.js Server-side: ${extra.message || error.message}`,
      },
    });
  } else {
    SentryBrowser.captureException(error, {
      extra: {
        ...extra,
        message: `Next.js Client-side: ${extra.message || error.message}`,
      },
    });
  }

  if (isDev) {
    console.error(error.message, extra.message || extra);
    console.error(error);
  }
};

const handleMessage = ({ message } = {}) => {
  if (isServer) {
    SentryNode.captureMessage(`Next.js Server-side: ${message}`);
  } else {
    SentryBrowser.captureMessage(`Next.js Client-side: ${message}`);
  }

  if (isDev) {
    console.warn(message);
  }
};

export default {
  handleError,
  handleMessage,
};
