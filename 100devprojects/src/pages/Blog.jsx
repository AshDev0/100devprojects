import { useState } from 'react';
import BlogCard from '../components/BlogCard';
import { blogs, blogCategories, getFeaturedBlogs } from '../data/blogs/index';
import { useSEO } from '../hooks/useSEO';

const Blog = () => {
  useSEO({
    title: 'Blog | 100 Dev Projects - Tutorials, Guides & Web Development Tips',
    description: 'Read tutorials, guides, and tips on JavaScript, React, and web development. Learn through detailed project breakdowns and coding best practices.',
    keywords: 'web development blog, javascript tutorials, coding guides, developer tips, programming blog',
    canonicalUrl: 'https://100devprojects.in/blog'
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const featuredBlogs = getFeaturedBlogs();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Developer Blog</h1>
          <p className="text-xl text-center text-indigo-100 max-w-3xl mx-auto">
            Tutorials, guides, and tips to accelerate your web development journey
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{blogs.length}</div>
              <div className="text-sm text-indigo-100 mt-1">Articles</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{featuredBlogs.length}</div>
              <div className="text-sm text-indigo-100 mt-1">Featured</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center col-span-2 md:col-span-1">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm text-indigo-100 mt-1">Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blogs Section */}
      {selectedCategory === 'All' && !searchTerm && featuredBlogs.length > 0 && (
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <span>⭐</span>
              Featured Articles
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </section>
      )}

      {/* Filters Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {searchTerm || selectedCategory !== 'All'
              ? 'Search & Filter Articles'
              : 'Browse All Articles'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Articles
              </label>
              <input
                type="text"
                placeholder="Search by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {blogCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredBlogs.length} of {blogs.length} articles
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
            <p className="text-xl text-gray-600 mb-2">No articles found</p>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Building?</h2>
          <p className="text-xl mb-8 text-indigo-100">
            Put what you've learned into practice with our hands-on projects
          </p>
          <a
            href="/projects"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Explore Projects
          </a>
        </div>
      </section>
    </div>
  );
};

export default Blog;
