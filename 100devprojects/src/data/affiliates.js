// Affiliate partner allowlist. /go/[partner] only ever redirects to a `url` defined here —
// never to a URL built from request input (open-redirect protection).

export const affiliates = {
  hostinger: {
    name: 'Hostinger',
    // TODO(ashwani): paste the real affiliate link from the Hostinger dashboard
    url: process.env.AFFILIATE_HOSTINGER_URL || 'https://www.hostinger.com/',
    subIdParam: null, // TODO(ashwani): set the sub-ID query param name if Hostinger supports one
  },
};

// Own-property lookup so names like "constructor" or "__proto__" never match.
export function getAffiliate(partner) {
  return Object.hasOwn(affiliates, partner) ? affiliates[partner] : null;
}

// Sub-IDs label which post sent the click: lowercase [a-z0-9-], max 50 chars.
export function sanitizeSubId(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .slice(0, 50);
}
