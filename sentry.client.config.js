import * as Sentry from '@sentry/nextjs';

const environment = process.env.SENTRY_ENVIRONMENT || process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT;
const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn,
  environment,
  debug: false,
  tracesSampleRate: 1.0,
  maxValueLength: 20000,
});
