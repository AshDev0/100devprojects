import Blog from '../../views/Blog';
import { buildMetadata } from '../../lib/site';
import { getBlogCards, getFeaturedBlogCards, blogCategories } from '../../lib/summaries';

export const metadata = buildMetadata({
  title: 'Blog | 100 Dev Projects - Tutorials, Guides & Web Development Tips',
  description:
    'Read tutorials, guides, and tips on JavaScript, React, and web development. Learn through detailed project breakdowns and coding best practices.',
  keywords: 'web development blog, javascript tutorials, coding guides, developer tips, programming blog',
  path: '/blog',
});

export default function BlogPage() {
  return <Blog blogs={getBlogCards()} featuredBlogs={getFeaturedBlogCards()} blogCategories={blogCategories} />;
}
