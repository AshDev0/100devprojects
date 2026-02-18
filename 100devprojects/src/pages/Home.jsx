import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import BlogCard from '../components/BlogCard';
import { projects, categories, difficultyLevels } from '../data/projects';
import { getFeaturedBlogs } from '../data/blogs/index';
import { useSEO } from '../hooks/useSEO';
import { useSchema } from '../hooks/useSchema';

const Home = () => {
  useSEO({
    title: '100 Dev Projects | Learn Web Development by Building Real Projects',
    description: 'Master JavaScript, React, and web development by building 100+ real-world projects. Step-by-step tutorials with production-ready code.',
    keywords: 'web development projects, JavaScript projects, React projects, learn coding, developer portfolio, programming tutorials',
    ogImage: 'https://100devprojects.in/og-default.jpg',
    canonicalUrl: 'https://100devprojects.in'
  });

  useSchema([
    {
      "@type": "WebSite",
      "name": "100 Dev Projects",
      "url": "https://100devprojects.in",
      "description": "Master JavaScript, React, and web development by building 100+ real-world projects with step-by-step tutorials.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://100devprojects.in/?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "name": "100 Dev Projects",
      "url": "https://100devprojects.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://100devprojects.in/android-chrome-512x512.png",
        "width": 512,
        "height": 512
      },
      "sameAs": [
        "https://github.com/AshDev0/100devprojects"
      ],
      "description": "A platform for learning web development by building 100+ real-world JavaScript and React projects."
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filtersActive = searchTerm || selectedCategory !== 'All' || selectedDifficulty !== 'All';

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || project.difficulty === selectedDifficulty;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const featuredProjects = projects.filter(p => p.featured);
  const trendingProjects = projects.filter(p => p.trending);
  const featuredBlogs = getFeaturedBlogs().slice(0, 3);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-24 md:py-32 pb-32 md:pb-40 overflow-hidden bg-300% animate-gradient">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-yellow-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Animated Heading */}
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in tracking-tight">
            <span className="inline-block text-6xl md:text-8xl hover:scale-110 transition-transform drop-shadow-lg">100</span>
            {' '}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-yellow-300 to-pink-300 drop-shadow-sm">
              Dev Projects
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-4 text-blue-100 max-w-3xl mx-auto font-medium">
            Learn by building <span className="text-yellow-300 font-bold">real-world projects</span>.
            From beginner to advanced.
          </p>

          <p className="text-md md:text-lg mb-10 text-blue-200 max-w-2xl mx-auto">
            Master JavaScript, React, and web development with hands-on tutorials and production-ready code.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a
              href="#projects"
              className="group bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                Explore Projects
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            <a
              href="https://github.com/AshDev0/100devprojects/tree/main/100devprojects/public/demos"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 hover:scale-105 active:scale-95 transition-all"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
              </span>
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="inline-block animate-bounce">
            <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
            <path d="M0 60L1440 60L1440 0C1440 0 1080 40 720 40C360 40 0 0 0 0L0 60Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative bg-white py-16 -mt-1">
        <div className="container mx-auto px-4">
          {/* Decorative accent line */}
          <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-purple-600 mx-auto mb-10 rounded-full"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div className="p-6 rounded-xl hover:bg-blue-50/50 transition-colors duration-300">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{projects.length}+</div>
              <p className="text-gray-600 font-medium">Projects Available</p>
            </div>
            <div className="p-6 rounded-xl hover:bg-purple-50/50 transition-colors duration-300">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">10+</div>
              <p className="text-gray-600 font-medium">Technologies</p>
            </div>
            <div className="p-6 rounded-xl hover:bg-green-50/50 transition-colors duration-300">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">100%</div>
              <p className="text-gray-600 font-medium">Free Forever</p>
            </div>
            <div className="p-6 rounded-xl hover:bg-pink-50/50 transition-colors duration-300">
              <div className="text-4xl md:text-5xl font-bold text-pink-600 mb-2">&infin;</div>
              <p className="text-gray-600 font-medium">Learning Opportunities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {!filtersActive && featuredProjects.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <span>⭐</span>
                  Featured Projects
                </h2>
                <div className="w-16 h-1 bg-yellow-400 mt-3 rounded-full"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending Projects Section */}
      {!filtersActive && trendingProjects.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <span>🔥</span>
                  Trending Now
                </h2>
                <div className="w-16 h-1 bg-pink-500 mt-3 rounded-full"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendingProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Blog Posts Section */}
      {!filtersActive && featuredBlogs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-linear-to-br from-purple-50 to-blue-50 rounded-2xl p-8 md:p-12">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <span>📚</span>
                    Latest Tutorials & Guides
                  </h2>
                  <div className="w-16 h-1 bg-purple-500 mt-3 rounded-full"></div>
                </div>
                <Link
                  to="/blog"
                  className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 group"
                >
                  View All
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredBlogs.map(blog => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filters & Browse Section */}
      <section className="py-16 bg-white" id="projects">
        <div className="container mx-auto px-4">
          {/* Filter Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10 border border-gray-100">
            {/* Gradient accent bar */}
            <div className="h-1 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600"></div>
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {filtersActive ? 'Search & Filter Projects' : 'Browse All Projects'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Projects
                  </label>
                  <input
                    type="text"
                    placeholder="Search by name, tech, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
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
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
                  >
                    {difficultyLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                Showing {filteredProjects.length} of {projects.length} projects
              </div>
            </div>
          </div>

          {/* Filters Active Notice */}
          {filtersActive && (
            <div className="flex items-center gap-2 mb-8 px-4 py-3 bg-blue-50 border border-blue-100 rounded-lg text-blue-700 text-sm">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                Filters active. <button onClick={clearFilters} className="font-semibold underline hover:text-blue-900">Clear all filters</button> to see Featured, Trending, and Blog sections.
              </span>
            </div>
          )}

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No projects found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
