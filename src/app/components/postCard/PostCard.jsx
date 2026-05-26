import { useState } from "react";

export default function PostCard({ post, markComplete, deletePost, editPost }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputEditTitle, setInputEditTitle] = useState(post.title);
  const [inputEditContent, setInputEditContent] = useState(post.content);
  return (
    <div>
      {isEditing ? (
        <div
          key={post.id}
          className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-3 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="items-center gap-2">
                <div className="flex items-center">
                  <p>Title:</p>
                  <input
                    type="text"
                    placeholder="Enter new post title..."
                    value={inputEditTitle}
                    onChange={(event) => setInputEditTitle(event.target.value)}
                    className="w-full mb-2 rounded-xl border border-slate-200 px-4 py-2 text-slate-700 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
                <div className="flex items-center">
                  <p>Content:</p>
                  <input
                    type="text"
                    placeholder="Enter new post content..."
                    value={inputEditContent}
                    onChange={(event) =>
                      setInputEditContent(event.target.value)
                    }
                    className="w-full mb-2 rounded-xl border border-slate-200 px-4 py-2 text-slate-700 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <button
                    onClick={() => {
                      editPost(post.id, inputEditTitle, inputEditContent);
                      setIsEditing(false);
                    }}
                    className="flex-1 rounded-xl bg-sky-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setInputEditTitle(post.title);
                      setInputEditContent(post.content);
                    }}
                    className="flex-1 rounded-xl bg-rose-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          key={post.id}
          className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-3 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                  {post.title}
                </h2>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                    post.completed
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {post.completed ? "Done" : "Open"}
                </span>
              </div>
            </div>
            <span className="text-2xl leading-none">
              {post.completed ? "✅" : "❌"}
            </span>
          </div>
          <p className="mb-4 text-sm leading-6 text-slate-600">
            {post.content}
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 rounded-xl border bg-green-500 hover:bg-green-600 px-3 py-2 text-sm font-semibold text-white transition-colors"
            >
              Edit
            </button>
            {post.completed ? (
              <button
                disabled={true}
                className="flex-1 cursor-not-allowed rounded-xl bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-500 transition-colors"
              >
                Completed
              </button>
            ) : (
              <button
                onClick={() => markComplete(post.id)}
                className="flex-1 rounded-xl bg-sky-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
              >
                Mark Complete
              </button>
            )}

            <button
              onClick={() => deletePost(post.id)}
              className="flex-1 rounded-xl bg-rose-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-600"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
