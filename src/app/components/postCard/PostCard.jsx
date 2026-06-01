import { useState } from "react";
import {
  ArrowBigDown,
  ArrowBigUp,
  MessageCircle,
  Share2,
  PencilLine,
  Trash2,
} from "lucide-react";

export default function PostCard({ post, deletePost, editPost }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputEditTitle, setInputEditTitle] = useState(post.title);
  const [inputEditContent, setInputEditContent] = useState(post.content);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md">
      {isEditing ? (
        <div className="flex flex-col gap-4 p-5">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Edit Post
          </h2>
          <div className="space-y-3">
            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Title
              </span>
              <input
                type="text"
                placeholder="Enter new post title..."
                value={inputEditTitle}
                onChange={(event) => setInputEditTitle(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-700 transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Content
              </span>
              <input
                type="text"
                placeholder="Enter new post content..."
                value={inputEditContent}
                onChange={(event) => setInputEditContent(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-700 transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
              />
            </label>

            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  editPost(post.id, inputEditTitle, inputEditContent);
                  setIsEditing(false);
                }}
                className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-600"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setInputEditTitle(post.title);
                  setInputEditContent(post.content);
                }}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700"
              >
                Cancel
              </button>
              <button
                onClick={() => deletePost(post.id)}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex">
          <div className="min-w-0 flex-1 p-5">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="mb-1 text-xs text-slate-500">
                  r/shrimpapp • 3h ago
                </p>
                <h2 className="truncate text-lg font-semibold tracking-tight text-slate-900">
                  {post.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                    post.completed
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {post.completed ? "Completed" : "Open"}
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <PencilLine className="h-3.5 w-3.5" />
                    Edit
                  </span>
                </button>
              </div>
            </div>

            <p className="mb-4 text-sm leading-6 text-slate-600">
              {post.content}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <div className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1.5 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-white hover:ring-cyan-200">
                <button
                  type="button"
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-cyan-50 hover:text-cyan-700"
                  aria-label="Upvote"
                >
                  <ArrowBigUp className="h-3.5 w-3.5" />
                </button>

                <span className="flex min-w-8 items-center justify-center px-2 text-sm font-semibold text-slate-900">
                  {post.vote}
                </span>

                <button
                  type="button"
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-cyan-50 hover:text-cyan-700"
                  aria-label="Downvote"
                >
                  <ArrowBigDown className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-cyan-50 hover:text-cyan-700"
              >
                <MessageCircle className="h-4 w-4" />
                Comment
                {/* <span className="text-xs text-slate-500">{comments}</span> */}
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-cyan-50 hover:text-cyan-700"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>

              <button
                type="button"
                onClick={() => deletePost(post.id)}
                className="ml-auto inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-700"
              >
                <span className="inline-flex items-center gap-1.5">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
