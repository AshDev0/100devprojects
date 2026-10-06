import TermsOfService from '../../views/TermsOfService';
import { buildMetadata } from '../../lib/site';

export const metadata = buildMetadata({
  title: 'Terms of Service | 100 Dev Projects',
  description: 'Terms of Service for 100devprojects.in - Learn about the rules and guidelines for using our educational platform.',
  path: '/terms-of-service',
});

export default function TermsOfServicePage() {
  return <TermsOfService />;
}
