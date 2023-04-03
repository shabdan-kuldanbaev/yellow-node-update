import * as Sentry from '@sentry/nextjs';

const isServer = typeof window === 'undefined';
const isDev = process.env.NODE_ENV !== 'production';

export const handleError = ({ error = {}, ...extra } = {}) => {
  const messageSide = isServer ? 'Server-side' : 'Client-side';

  Sentry.captureException(error, {
    extra: {
      ...extra,
      message: `Next.js ${messageSide}: ${extra.message || error.message}`,
    },
  });

  if (isDev) {
    console.error(error.message, extra.message || extra);
    console.error(error);
  }
};

export const handleMessage = ({ message } = {}) => {
  const messageSide = isServer ? 'Server-side' : 'Client-side';

  Sentry.captureMessage(`Next.js ${messageSide}: ${message}`, 'info');

  if (isDev) {
    console.warn(message);
  }
};

export const handleApiError = ({ error = {}, ...extra } = {}) => {
  Sentry.captureException(error, {
    extra: {
      ...extra,
      message: `Server: ${extra.message || error.message}`,
    },
  });
  console.error(error.message, extra.message || extra);
  console.error(error);
};

export const handleApiMessage = ({ message } = {}) => {
  Sentry.captureMessage(`Server: ${message}`);
};

export default {
  handleError,
  handleMessage,
  handleApiError,
  handleApiMessage,
};
