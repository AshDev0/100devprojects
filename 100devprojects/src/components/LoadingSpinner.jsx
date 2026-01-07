const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`${sizeClasses[size]} relative`}>
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>

        {/* Spinning Ring */}
        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>

      {text && (
        <p className={`mt-4 text-gray-600 font-medium ${textSizes[size]}`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
