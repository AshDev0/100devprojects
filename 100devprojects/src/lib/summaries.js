// Card-sized views of the data. Client components (filters/search) receive only
// these fields, keeping long markdown bodies and project write-ups server-side.
import { projects, categories, difficultyLevels } from '../data/projects';
import { blogs, blogCategories, getFeaturedBlogs } from '../data/blogs/index';

const toProjectCard = (p) => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  description: p.description,
  category: p.category,
  difficulty: p.difficulty,
  estimatedTime: p.estimatedTime ?? null,
  techStack: p.techStack,
  tags: p.tags,
  thumbnail: p.thumbnail ?? null,
  demoUrl: p.demoUrl,
  featured: Boolean(p.featured),
  trending: Boolean(p.trending),
});

const toBlogCard = (b) => ({
  id: b.id,
  slug: b.slug,
  title: b.title,
  excerpt: b.excerpt,
  category: b.category,
  tags: b.tags,
  author: b.author,
  datePublished: b.datePublished,
  readTime: b.readTime,
  featured: Boolean(b.featured),
});

export const getProjectCards = () => projects.map(toProjectCard);
export const getBlogCards = () => blogs.map(toBlogCard);
export const getFeaturedBlogCards = (limit) => getFeaturedBlogs().slice(0, limit).map(toBlogCard);
export { categories, difficultyLevels, blogCategories };
