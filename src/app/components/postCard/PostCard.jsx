export default function PostCard({ post, markComplete, deletePost }) {
  return (
    <div
      key={post.id}
      className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900">{post.title}</h2>
        <span className="text-xl">{post.completed ? "✅" : "❌"}</span>
      </div>
      <p className="text-gray-600 text-sm mb-4">{post.content}</p>
      <div className="flex gap-2">
        {post.completed ? (
          <button
            disabled={true}
            className="flex-1 bg-blue-300 hover:bg-blue-200 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors"
          >
            Completed
          </button>
        ) : (
          <button
            onClick={() => markComplete(post.id)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors"
          >
            Mark Complete
          </button>
        )}

        <button
          onClick={() => deletePost(post.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
