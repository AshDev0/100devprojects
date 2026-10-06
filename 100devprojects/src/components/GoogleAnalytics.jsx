'use client';

import { useSyncExternalStore } from 'react';
import Script from 'next/script';
import { GA_ID } from '../lib/site';
import { CONSENT_EVENT, getConsent } from '../lib/consent';

function subscribe(onChange) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener('storage', onChange); // choice made in another tab
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

const hasAccepted = () => getConsent() === 'accepted';
// The server never knows the visitor's choice; rendering nothing there keeps hydration consistent.
const serverSnapshot = () => false;

// Loads GA4 only after the visitor accepts cookies — on a later visit, or the moment they click Accept.
export default function GoogleAnalytics() {
  const accepted = useSyncExternalStore(subscribe, hasAccepted, serverSnapshot);
  if (!accepted) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
