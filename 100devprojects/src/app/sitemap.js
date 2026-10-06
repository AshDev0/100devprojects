import { projects } from '../data/projects';
import { blogs } from '../data/blogs/index';
import { SITE_URL } from '../lib/site';

// Generated at build time from the data files — new projects/blogs are added automatically.
export default function sitemap() {
  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/projects', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/blog', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/privacy-policy', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/terms-of-service', priority: 0.2, changeFrequency: 'yearly' },
  ].map(({ path, ...rest }) => ({ url: `${SITE_URL}${path}`, ...rest }));

  const projectRoutes = projects.map((p) => ({
    url: `${SITE_URL}/project/${p.slug}`,
    lastModified: p.dateUpdated || p.dateAdded,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Demo pages are standalone HTML apps; listing them helps discovery of the live demos.
  const demoRoutes = projects
    .filter((p) => p.demoUrl?.startsWith('/demos/'))
    .map((p) => ({ url: `${SITE_URL}${p.demoUrl}`, changeFrequency: 'monthly', priority: 0.5 }));

  const blogRoutes = blogs.map((b) => ({
    url: `${SITE_URL}/blog/${b.slug}`,
    lastModified: b.dateModified || b.datePublished,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes, ...demoRoutes];
}
