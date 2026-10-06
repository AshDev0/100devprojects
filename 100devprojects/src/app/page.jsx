import Home from '../views/Home';
import { buildMetadata } from '../lib/site';
import { getProjectCards, getFeaturedBlogCards, categories, difficultyLevels } from '../lib/summaries';

export const metadata = buildMetadata({
  title: '100 Dev Projects | Learn Web Development by Building Real Projects',
  description:
    'Master JavaScript, React, and web development by building 100+ real-world projects. Step-by-step tutorials with production-ready code.',
  keywords:
    'web development projects, JavaScript projects, React projects, learn coding, developer portfolio, programming tutorials',
  path: '/',
});

export default function HomePage() {
  return (
    <Home
      projects={getProjectCards()}
      featuredBlogs={getFeaturedBlogCards(3)}
      categories={categories}
      difficultyLevels={difficultyLevels}
    />
  );
}
