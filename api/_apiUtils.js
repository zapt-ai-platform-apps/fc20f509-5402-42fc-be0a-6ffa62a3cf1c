import * as Sentry from "@sentry/node";

// Initialize Sentry for backend error tracking
Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

export function captureError(error, extraInfo = {}) {
  console.error('API Error:', error);
  Sentry.captureException(error, { 
    extra: extraInfo 
  });
}