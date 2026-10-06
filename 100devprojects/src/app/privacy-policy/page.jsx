import PrivacyPolicy from '../../views/PrivacyPolicy';
import { buildMetadata } from '../../lib/site';

export const metadata = buildMetadata({
  title: 'Privacy Policy | 100 Dev Projects',
  description: 'Privacy Policy for 100devprojects.in - Learn how we collect, use, and protect your data.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
