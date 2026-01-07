import { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    // TODO: Log to error tracking service (Sentry, LogRocket, etc.)
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
              {/* Error Icon */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
                  <svg
                    className="w-10 h-10 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>

              {/* Error Message */}
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Oops! Something Went Wrong
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                We encountered an unexpected error. Don't worry, it's not your fault.
                Our team has been notified and we're working on fixing it.
              </p>

              {/* Error Details (Development Only) */}
              {import.meta.env.DEV && this.state.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm font-semibold text-red-800 mb-2">
                    Error Details (Development Mode):
                  </p>
                  <p className="text-sm text-red-700 font-mono mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <details className="mt-2">
                      <summary className="text-sm text-red-600 cursor-pointer hover:text-red-800">
                        View Stack Trace
                      </summary>
                      <pre className="text-xs text-red-600 mt-2 overflow-x-auto whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.handleReset}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Try Again
                </button>
                <Link
                  to="/"
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Go to Homepage
                </Link>
              </div>

              {/* Additional Help */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">
                  If this problem persists, please contact us:
                </p>
                <div className="flex flex-wrap gap-4 justify-center text-sm">
                  <a
                    href="mailto:support@100devprojects.in"
                    className="text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    support@100devprojects.in
                  </a>
                  <span className="text-gray-400">•</span>
                  <a
                    href="https://github.com/AshDev0/100devprojects/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Report on GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Fun Error Message */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                💡 <span className="italic">
                  "The best error message is the one that never shows up."
                </span> - Thomas Fuchs
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
