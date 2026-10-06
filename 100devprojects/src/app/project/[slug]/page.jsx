import { notFound } from 'next/navigation';
import ProjectDetail from '../../../views/ProjectDetail';
import JsonLd from '../../../components/JsonLd';
import { projects, getProjectBySlug } from '../../../data/projects';
import { buildMetadata, projectSchemas } from '../../../lib/site';

// Only slugs from data/projects.js exist — anything else is a real 404 (not a soft 404).
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return buildMetadata({
    title: project.meta?.title || `${project.title} | 100 Dev Projects`,
    description: project.meta?.description || project.description,
    keywords: project.meta?.keywords,
    // Canonical is always derived from the route, never from data, to avoid mismatches.
    path: `/project/${project.slug}`,
    ogImage: project.meta?.ogImage || project.thumbnail,
  });
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd data={projectSchemas(project)} />
      <ProjectDetail project={project} />
    </>
  );
}
