import { Link } from 'react-router-dom';

const ServerError = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Error Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full">
              <svg
                className="w-12 h-12 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Error Code */}
          <h1 className="text-8xl font-bold text-gray-800 mb-4">500</h1>

          {/* Error Message */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Internal Server Error
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Something went wrong on our end. We're working to fix the issue.
            Please try again later.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Refresh Page
            </button>
            <Link
              to="/"
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Go to Homepage
            </Link>
          </div>

          {/* Support Link */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              If this problem persists, please{' '}
              <a
                href="mailto:support@100devprojects.in"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                contact support
              </a>
            </p>
          </div>
        </div>

        {/* Fun Error Message */}
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            💡 <span className="italic">
              "Error 500: It's not you, it's us. We're feeling a bit broken right now."
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
