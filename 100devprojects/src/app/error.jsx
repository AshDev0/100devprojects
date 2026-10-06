'use client';

import { useEffect } from 'react';
import ServerError from '../views/ServerError';

// Replaces the old class-based ErrorBoundary for every route segment.
export default function Error({ error, reset }) {
  useEffect(() => {
    // TODO: send to an error tracker (Sentry etc.) when one is added
    console.error(error);
  }, [error]);

  return <ServerError onRetry={reset} />;
}
