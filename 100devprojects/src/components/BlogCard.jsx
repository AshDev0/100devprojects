import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <article className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      {/* Category Badge */}
      <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-semibold">
            {blog.category}
          </span>
        </div>
        {blog.featured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
              ⭐ Featured
            </span>
          </div>
        )}
        <div className="pt-8">
          <h3 className="text-white text-xl font-bold line-clamp-2 mb-2">
            {blog.title}
          </h3>
        </div>
      </div>

      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <span>📅</span>
            <span>{new Date(blog.datePublished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>⏱️</span>
            <span>{blog.readTime}</span>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
          {blog.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
          {blog.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              +{blog.tags.length - 3}
            </span>
          )}
        </div>

        {/* Author */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {blog.author[0]}
            </div>
            <span className="text-sm font-medium text-gray-700">{blog.author}</span>
          </div>

          <Link
            to={`/blog/${blog.slug}`}
            className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 group"
          >
            Read More
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
