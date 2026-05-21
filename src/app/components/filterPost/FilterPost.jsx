export default function FilterPost({ filteredPosts, setFilter }) {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Filter Posts</h2>
        {filteredPosts.length > 1 ? (
          <p className="text-right text-sm text-gray-600">
            {filteredPosts.length} posts found
          </p>
        ) : (
          <p className="text-right text-sm text-gray-600">
            {filteredPosts.length} post found
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => setFilter("All")}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors"
        >
          All
        </button>
        <button
          onClick={() => setFilter("Completed")}
          className="w-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors"
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("Incomplete")}
          className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors"
        >
          Incomplete
        </button>
      </div>
    </div>
  );
}
