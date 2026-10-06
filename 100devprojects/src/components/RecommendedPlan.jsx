import { getAffiliate, sanitizeSubId } from '../data/affiliates';

const ctaClasses =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2';

// Affiliate call-to-action. Links go through /go/<partner> (never straight to the partner)
// so clicks are tracked per post via `sub`. Renders nothing for unknown partners.
export default function RecommendedPlan({ partner, sub, title, points = [], ctaLabel, compact = false }) {
  const affiliate = getAffiliate(partner);
  if (!affiliate) return null;

  const subId = sanitizeSubId(sub);
  const href = `/go/${partner}${subId ? `?sub=${subId}` : ''}`;
  const label = ctaLabel || `See ${affiliate.name} plans`;

  const link = (
    <a href={href} target="_blank" rel="sponsored nofollow noopener" className={ctaClasses}>
      {label}
      <span aria-hidden="true">→</span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );

  if (compact) {
    return (
      <aside className="my-6 flex flex-col gap-4 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold text-gray-900">{title || `Following along? You'll need a ${affiliate.name} hosting plan.`}</p>
        <div className="shrink-0">{link}</div>
      </aside>
    );
  }

  return (
    <aside className="mb-12 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 md:p-8">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-purple-800">Recommended</p>
      <h2 className="mb-3 text-2xl font-bold text-gray-900">{title || `Get started with ${affiliate.name}`}</h2>
      {points.length > 0 && (
        <ul className="mb-6 space-y-2">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-2 text-gray-700">
              <span className="mt-0.5 font-bold text-blue-600" aria-hidden="true">✓</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
      {link}
    </aside>
  );
}
