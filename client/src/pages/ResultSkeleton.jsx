const ResultSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto" />

      <div className="mt-6 h-32 bg-gray-200 rounded-xl" />

      <div className="mt-6 h-4 bg-gray-200 rounded w-3/4 mx-auto" />
      <div className="mt-2 h-4 bg-gray-200 rounded w-2/3 mx-auto" />
    </div>
  );
};

export default ResultSkeleton;
