// Blog dates are plain "YYYY-MM-DD" strings. Anything else — e.g. a 'TODO' placeholder on an
// unpublished draft — is treated as missing, so it never reaches the UI, sitemap or JSON-LD.
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export const isoDate = (value) => (typeof value === 'string' && ISO_DATE.test(value) ? value : undefined);

// timeZone: 'UTC' keeps server and client output identical (no hydration mismatch).
export function formatDate(value) {
  const date = isoDate(value);
  return date
    ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
    : undefined;
}
