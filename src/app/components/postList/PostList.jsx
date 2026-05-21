import PostCard from "../postCard/PostCard";

export default function PostList({
  posts,
  filteredPosts,
  markComplete,
  deletePost,
}) {
  return (
    <main className="space-y-4">
      {posts.length === 0 ? (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 text-center">
            No posts yet
          </h2>
          <p className="text-gray-600 text-sm mb-4 text-center">
            Create your first post
          </p>
        </div>
      ) : (
        filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            markComplete={markComplete}
            deletePost={deletePost}
          />
        ))
      )}
    </main>
  );
}
