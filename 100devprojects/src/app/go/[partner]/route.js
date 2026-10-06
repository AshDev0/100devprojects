import { getAffiliate, sanitizeSubId } from '../../../data/affiliates';

// Outbound affiliate redirect: /go/<partner>?sub=<post-id>
// The target is always the allowlisted base URL; `sub` is only ever added as a sanitized query value.
export async function GET(request, { params }) {
  const { partner } = await params;
  const affiliate = getAffiliate(partner);
  if (!affiliate) {
    return new Response('Not found', { status: 404, headers: { 'X-Robots-Tag': 'noindex, nofollow' } });
  }

  const target = new URL(affiliate.url);
  const sub = sanitizeSubId(request.nextUrl.searchParams.get('sub'));
  if (sub && affiliate.subIdParam) {
    target.searchParams.set(affiliate.subIdParam, sub);
  }

  return new Response(null, {
    status: 307,
    headers: {
      Location: target.toString(),
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
    },
  });
}
