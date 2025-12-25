import { useParams, Link } from 'react-router-dom';
import { getBlogBySlug, getRelatedBlogs } from '../data/blogs';
import { projects } from '../data/projects';
import { useSEO } from '../hooks/useSEO';
import BlogCard from '../components/BlogCard';
import MarkdownContent from '../components/MarkdownContent';

const BlogDetail = () => {
  const { slug } = useParams();
  const blog = getBlogBySlug(slug);

  useSEO({
    title: blog?.meta?.title || 'Blog | 100 Dev Projects',
    description: blog?.meta?.description || 'Read web development tutorials and guides',
    keywords: blog?.meta?.keywords?.join(', ') || '',
    canonicalUrl: blog?.meta?.canonicalUrl || 'https://100devprojects.in/blog'
  });

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <Link to="/blog" className="text-blue-600 hover:underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  const relatedBlogs = getRelatedBlogs(blog);
  const relatedProjects = blog.relatedProjects?.map(slug =>
    projects.find(p => p.slug === slug)
  ).filter(Boolean) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-blue-600">Blog</Link>
          <span>/</span>
          <span className="text-gray-900">{blog.title}</span>
        </div>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-4 py-1.5 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 rounded-full text-sm font-semibold border border-purple-200">
              {blog.category}
            </span>
            {blog.featured && (
              <span className="px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 rounded-full text-sm font-bold shadow-md">
                ⭐ Featured Article
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 leading-relaxed mb-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            {blog.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                {blog.author[0]}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{blog.author}</div>
                <div className="text-sm text-gray-500">Author</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                <span>📅</span>
                <span className="font-medium">{new Date(blog.datePublished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                <span>⏱️</span>
                <span className="font-medium">{blog.readTime}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200 hover:border-blue-400 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 border border-gray-100">
          <MarkdownContent content={blog.content} />
        </div>

        {/* Share Section */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mb-12 border border-purple-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Found this helpful?</h3>
              <p className="text-gray-600">Share this article with your developer friends!</p>
            </div>
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Tweet
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-blue-600">🚀</span>
              Build These Projects
            </h2>
            <p className="text-gray-600 mb-6">Put what you learned into practice with these hands-on projects</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map(project => (
                <Link
                  key={project.id}
                  to={`/project/${project.slug}`}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-blue-300 group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      {project.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">⏱️ {project.estimatedTime}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.shortTitle}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-4 text-blue-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Start Building
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-purple-600">📚</span>
              Continue Learning
            </h2>
            <p className="text-gray-600 mb-6">Explore more tutorials and guides</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map(relatedBlog => (
                <BlogCard key={relatedBlog.id} blog={relatedBlog} />
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors font-medium shadow-lg"
          >
            <span>←</span>
            Back to All Articles
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
