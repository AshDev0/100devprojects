import Link from 'next/link';
import { SITE_NAME } from '../lib/site';

// TODO(ashwani): the privacy policy has no affiliate section yet — add one so this link explains the disclosure.
export default function AffiliateDisclosure() {
  return (
    <p className="mb-8 text-sm text-gray-600 leading-relaxed">
      This post contains affiliate links. If you buy through them, {SITE_NAME} may earn a commission at no
      extra cost to you.{' '}
      <Link
        href="/privacy-policy"
        className="text-blue-700 underline hover:text-blue-800 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      >
        Privacy Policy
      </Link>
    </p>
  );
}
