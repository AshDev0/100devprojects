const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col animate-pulse">
      {/* Skeleton Thumbnail */}
      <div className="relative h-48 bg-gray-300"></div>

      <div className="p-6 flex flex-col grow">
        {/* Skeleton Pills */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <div className="h-7 w-20 bg-gray-300 rounded-full"></div>
          <div className="h-7 w-24 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
        </div>

        {/* Skeleton Title */}
        <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>

        {/* Skeleton Description */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>

        {/* Skeleton Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
          <div className="h-6 w-14 bg-gray-300 rounded"></div>
        </div>

        {/* Skeleton Buttons */}
        <div className="flex gap-3 mt-auto">
          <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
          <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
