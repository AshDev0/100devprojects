import Projects from '../../views/Projects';
import { buildMetadata } from '../../lib/site';
import { getProjectCards, categories, difficultyLevels } from '../../lib/summaries';

export const metadata = buildMetadata({
  title: 'All Projects | 100 Dev Projects',
  description:
    'Browse our complete collection of web development projects. Filter by category, difficulty level, and technology stack to find the perfect project for your skill level.',
  keywords:
    'web development projects, javascript projects list, react projects, beginner coding projects, intermediate javascript',
  path: '/projects',
});

export default function ProjectsPage() {
  return <Projects projects={getProjectCards()} categories={categories} difficultyLevels={difficultyLevels} />;
}
