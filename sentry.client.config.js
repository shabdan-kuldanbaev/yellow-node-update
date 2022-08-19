import * as Sentry from '@sentry/nextjs';

const dev = process.env.NODE_ENV !== 'production';
const environment = process.env.SENTRY_ENVIRONMENT || process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT;
const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn,
  environment,
  debug: dev,
  tracesSampleRate: 1.0,
});
