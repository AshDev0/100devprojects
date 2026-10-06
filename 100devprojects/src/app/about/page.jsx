import About from '../../views/About';
import { buildMetadata } from '../../lib/site';

export const metadata = buildMetadata({
  title: 'About Us | 100 Dev Projects',
  description:
    'Learn about 100 Dev Projects - your gateway to mastering web development through hands-on practice. Build real projects, gain practical skills.',
  keywords: 'about 100devprojects, learn web development, javascript projects, coding practice, developer learning',
  path: '/about',
});

export default function AboutPage() {
  return <About />;
}
