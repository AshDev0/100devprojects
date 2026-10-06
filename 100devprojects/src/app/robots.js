import { SITE_URL } from '../lib/site';

export default function robots() {
  return {
    // /go/* are affiliate redirects — nothing there for crawlers to index.
    rules: [{ userAgent: '*', allow: '/', disallow: ['/go/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
