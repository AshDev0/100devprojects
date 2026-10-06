// Cookie-consent state shared by <CookieConsent /> (writes) and <GoogleAnalytics /> (reads).
// Browser-only: call these from effects or event handlers, never during server render.

const STORAGE_KEY = 'cookieConsent';
export const CONSENT_EVENT = 'cookie-consent-change';

// In-memory copy so a choice still applies to this page view when localStorage
// throws (e.g. Safari private mode).
let sessionConsent = null;

export function getConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? sessionConsent;
  } catch {
    return sessionConsent;
  }
}

export function setConsent(value) {
  sessionConsent = value;
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage unavailable — the choice lasts for this page view only.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}
