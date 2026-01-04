import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <div className="group relative h-full">
      {/* Main Card */}
      <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] h-full flex flex-col">
        {/* Shine Effect Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
        </div>

        {/* Thumbnail with Badges */}
        <div className="relative h-48 bg-linear-to-br from-blue-500 to-purple-600 overflow-hidden">
          {/* Project Thumbnail Image */}
          {project.thumbnail ? (
            <>
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                loading="lazy"
              />
              {/* Dark Overlay on Hover for Better Badge Visibility */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-4xl font-bold opacity-20">DEMO</span>
            </div>
          )}

          {/* Featured/Trending Badges - Enhanced Animation */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
            {project.featured && (
              <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 transform transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 translate-x-1 group-hover:translate-x-0">
                ⭐ Featured
              </span>
            )}
            {project.trending && (
              <span className="px-3 py-1 bg-pink-500 text-white rounded-full text-xs font-bold shadow-lg flex items-center gap-1 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 translate-x-1 group-hover:translate-x-0">
                🔥 Trending
              </span>
            )}
          </div>
        </div>

      <div className="p-6 flex flex-col grow">
        {/* Category Pills with Stagger Animation */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105"
            style={{ transitionDelay: '50ms' }}
          >
            {project.category}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 group-hover:scale-105 ${
              project.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 group-hover:bg-green-600 group-hover:text-white' :
              project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 group-hover:bg-yellow-600 group-hover:text-white' :
              'bg-red-100 text-red-800 group-hover:bg-red-600 group-hover:text-white'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {project.difficulty}
          </span>
          {project.estimatedTime && (
            <span
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium transition-all duration-300 group-hover:bg-gray-700 group-hover:text-white group-hover:scale-105"
              style={{ transitionDelay: '150ms' }}
            >
              ⏱️ {project.estimatedTime}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
          {project.description}
        </p>

        {/* Tech Stack Pills with Individual Hover */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded transition-all duration-300 hover:bg-blue-100 hover:text-blue-800 hover:scale-110 cursor-default"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded transition-all duration-300 hover:bg-blue-100 hover:text-blue-800 hover:scale-110 cursor-default">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Buttons with Gradient Hover Effect */}
        <div className="flex gap-3 mt-auto">
          <a href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg overflow-hidden group/btn transition-all text-center font-medium text-sm hover:shadow-lg hover:shadow-blue-500/50 active:scale-95"
          >
            <span className="relative z-10">View Demo</span>
            <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 bg-300% opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-gradient transition-opacity duration-300"></div>
          </a>
          <Link
            to={`/project/${project.slug}`}
            className="relative flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg overflow-hidden group/btn transition-all text-center font-medium text-sm hover:shadow-lg hover:bg-gray-300 active:scale-95"
          >
            <span className="relative z-10">Learn More</span>
            <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-300% opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProjectCard;
