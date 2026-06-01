import PostCard from "../postCard/PostCard";

export default function PostList({
  posts,
  filteredPosts,
  deletePost,
  editPost,
}) {
  const hasNoPosts = posts.length === 0;
  const hasNoMatch = filteredPosts.length === 0;

  return (
    <main className="space-y-4">
      {hasNoPosts ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">No posts yet</h2>
          <p className="mt-2 text-sm text-slate-600">Create your first post</p>
        </div>
      ) : hasNoMatch ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            No Matching Post Found
          </h2>
        </div>
      ) : (
        filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            deletePost={deletePost}
            editPost={editPost}
          />
        ))
      )}
    </main>
  );
}
