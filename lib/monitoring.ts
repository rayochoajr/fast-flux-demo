import * as Sentry from '@sentry/nextjs';

export function initMonitoring() {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 1.0,
      enabled: process.env.NODE_ENV === 'production',
    });
  }
} 