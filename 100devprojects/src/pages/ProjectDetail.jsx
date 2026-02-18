import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { getProjectBySlug } from '../data/projects.js';
import { useSEO } from '../hooks/useSEO';
import { useSchema } from '../hooks/useSchema';

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  // Use SEO Hook
  useSEO({
    title: project?.meta?.title || '100 Dev Projects',
    description: project?.meta?.description || 'Learn web development',
    keywords: project?.meta?.keywords?.join(', ') || '',
    ogImage: project?.meta?.ogImage
      ? `https://100devprojects.in${project.meta.ogImage}`
      : 'https://100devprojects.in/og-default.jpg',
    canonicalUrl: project?.meta?.canonicalUrl || 'https://100devprojects.in'
  });

  const schemas = useMemo(() => {
    if (!project) return null;
    const projectUrl = `https://100devprojects.in/project/${project.slug}`;
    return [
      {
        "@type": "LearningResource",
        "name": project.title,
        "description": project.description,
        "url": projectUrl,
        "educationalLevel": project.difficulty,
        "learningResourceType": "Project",
        "teaches": project.learningOutcomes,
        "timeRequired": project.estimatedTime,
        "keywords": project.tags.join(', '),
        "inLanguage": "en",
        "dateCreated": project.dateAdded,
        "author": {
          "@type": "Organization",
          "name": "100 Dev Projects",
          "url": "https://100devprojects.in"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://100devprojects.in" },
          { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://100devprojects.in/projects" },
          { "@type": "ListItem", "position": 3, "name": project.shortTitle, "item": projectUrl }
        ]
      }
    ];
  }, [project]);

  useSchema(schemas);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900">{project.title}</span>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="px-4 py-1 bg-white/20 rounded-full text-sm font-medium">
                {project.category}
              </span>
              <span className="px-4 py-1 bg-white/20 rounded-full text-sm font-medium">
                {project.difficulty}
              </span>
              {project.featured && (
                <span className="px-4 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold">
                  ⭐ Featured
                </span>
              )}
              {project.trending && (
                <span className="px-4 py-1 bg-pink-500 text-white rounded-full text-sm font-bold">
                  🔥 Trending
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-blue-100 mb-4">{project.description}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-blue-100">
              {project.estimatedTime && (
                <div className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>{project.estimatedTime}</span>
                </div>
              )}
              {project.dateAdded && (
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span>Added: {new Date(project.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
              >
                🚀 View Live Demo
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors text-center font-medium"
              >
                💻 View Source Code
              </a>
            </div>

            {/* Long Description */}
            {project.longDescription && (
              <div className="mb-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">About This Project</h2>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {project.longDescription}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Features */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Key Features</h2>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-600 mt-1 text-lg">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learning Outcomes */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">What You'll Learn</h2>
                <ul className="space-y-3">
                  {project.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">📚</span>
                      <span className="text-gray-700">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Tech Stack</h2>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 rounded-lg font-medium border border-blue-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            ← Back to All Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
