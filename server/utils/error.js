const Sentry = require('@sentry/node');

module.exports.handleError = ({ error = {}, ...extra } = {}) => {
  Sentry.captureException(error, { extra });
  console.error(error.message, extra.message || extra);
  console.error(error);
};

module.exports.handleMessage = ({ message } = {}) => {
  Sentry.captureMessage(message);
  console.warn(message);
};
