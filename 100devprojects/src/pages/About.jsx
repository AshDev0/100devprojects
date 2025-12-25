import { useSEO } from '../hooks/useSEO';

const About = () => {
  useSEO({
    title: 'About Us | 100 Dev Projects',
    description: 'Learn about 100 Dev Projects - your gateway to mastering web development through hands-on practice. Build real projects, gain practical skills.',
    keywords: 'about 100devprojects, learn web development, javascript projects, coding practice, developer learning',
    canonicalUrl: 'https://100devprojects.in/about'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">About 100 Dev Projects</h1>
          <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
            Your journey to becoming a skilled developer through hands-on project-based learning
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              At <span className="font-semibold text-blue-600">100 Dev Projects</span>, we believe the best way to learn web development
              is by building real-world projects. Theory is important, but practice makes perfect.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Our mission is to provide developers of all skill levels with a curated collection of
              <span className="font-semibold"> 100 hands-on projects</span> that cover everything from basic JavaScript
              to advanced React applications, APIs, and full-stack development.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Each project is carefully designed to teach you specific concepts, best practices,
              and industry-standard coding patterns that you can use in your own applications.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose 100 Dev Projects?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">100% Free Forever</h3>
                  <p className="text-gray-600">
                    All projects, source code, and tutorials are completely free. No hidden fees, no subscriptions.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Production-Ready Code</h3>
                  <p className="text-gray-600">
                    Clean, well-documented, and industry-standard code that you can use in real projects.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Learn by Doing</h3>
                  <p className="text-gray-600">
                    Every project is hands-on with clear learning outcomes and step-by-step guidance.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-orange-100 rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Beginner to Advanced</h3>
                  <p className="text-gray-600">
                    Projects range from simple calculators to complex full-stack applications.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-pink-100 rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Portfolio Ready</h3>
                  <p className="text-gray-600">
                    Build impressive projects to showcase in your developer portfolio and resume.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-100 rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Multiple Tech Stacks</h3>
                  <p className="text-gray-600">
                    JavaScript, React, Node.js, APIs, databases, and more coming soon.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What You'll Build */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">What You'll Build</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
                <p className="text-gray-700 font-semibold">Real-World Projects</p>
                <p className="text-sm text-gray-600 mt-2">From calculators to full apps</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl font-bold text-purple-600 mb-2">10+</div>
                <p className="text-gray-700 font-semibold">Tech Stacks Covered</p>
                <p className="text-sm text-gray-600 mt-2">JavaScript, React, APIs & more</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl font-bold text-green-600 mb-2">∞</div>
                <p className="text-gray-700 font-semibold">Learning Opportunities</p>
                <p className="text-sm text-gray-600 mt-2">Skills that last a lifetime</p>
              </div>
            </div>
          </div>

          {/* Creator Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About the Creator</h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Hi! I'm <span className="font-semibold text-blue-600">Ashwani</span>, a passionate web developer and educator
              who believes in learning by building.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              I created 100 Dev Projects to help aspiring developers gain practical skills through hands-on experience.
              Every project here is built with care, tested thoroughly, and designed to teach you something valuable.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              My goal is to make quality web development education accessible to everyone, completely free of charge.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/AshDev0/100devprojects"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Building?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Browse our collection of projects and start your development journey today!
          </p>
          <a
            href="/"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Explore Projects
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
