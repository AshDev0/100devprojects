import NotFound from '../views/NotFound';

// Next.js returns a real HTTP 404 for this page (the old SPA returned 200 for every URL).
export const metadata = {
  title: '404 - Page Not Found | 100 Dev Projects',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return <NotFound />;
}
