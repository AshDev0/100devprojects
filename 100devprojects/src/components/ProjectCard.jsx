import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      {/* Thumbnail with Badges */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-4xl font-bold opacity-20">DEMO</span>
        </div>

        {/* Featured/Trending Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {project.featured && (
            <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
              ⭐ Featured
            </span>
          )}
          {project.trending && (
            <span className="px-3 py-1 bg-pink-500 text-white rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
              🔥 Trending
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {project.category}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            project.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
            project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {project.difficulty}
          </span>
          {project.estimatedTime && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              ⏱️ {project.estimatedTime}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-blue-600 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 3).map((tech, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <a href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium text-sm"
          >
            View Demo
          </a>
          <Link
            to={`/project/${project.slug}`}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-center font-medium text-sm"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
