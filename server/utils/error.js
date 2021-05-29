const Sentry = require('@sentry/node');

function handleError({ error = {}, ...extra } = {}) {
  Sentry.captureException(error, {
    extra: {
      ...extra,
      message: `Server: ${extra.message || error.message}`,
    },
  });
  console.error(error.message, extra.message || extra);
  console.error(error);
}

function handleMessage({ message } = {}) {
  Sentry.captureMessage(`Server: ${message}`);
  console.warn(message);
}

module.exports = {
  handleError,
  handleMessage,
};
