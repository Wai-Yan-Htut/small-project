import { useState } from "react";
import {
  ArrowBigDown,
  ArrowBigUp,
  MessageCircle,
  Share2,
  PencilLine,
  Trash2,
} from "lucide-react";

export default function PostCard({
  post,
  deletePost,
  editPost,
  toggleUpvote,
  toggleDownvote,
  createComment,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputEditTitle, setInputEditTitle] = useState(post.title);
  const [inputEditContent, setInputEditContent] = useState(post.content);

  const [isCommenting, setIsCommenting] = useState(false);
  const [inputComment, setInputComment] = useState("");

  const postTimestamp = Math.floor((Date.now() - post.createdAt) / 1000);

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
            </div>
          </div>
        </div>
      ) : (
        <div className="flex">
          <div className="min-w-0 flex-1 p-5">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <span className="flex mb-1 text-xs text-slate-500">
                  r/shrimpapp •
                  {postTimestamp < 60
                    ? `${postTimestamp} sec ago`
                    : postTimestamp < 3600
                      ? `${Math.floor(postTimestamp / 60)} min ago`
                      : `${Math.floor(postTimestamp / 3600)} hr ago`}
                </span>
                <h2 className="truncate text-lg font-semibold tracking-tight text-slate-900">
                  {post.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
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
                {post.voteAction === "up" ? (
                  <button
                    type="button"
                    aria-label="Upvote"
                    onClick={() => toggleUpvote(post.id)}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full text-slate-500 transition-colors bg-cyan-500 hover:text-cyan-700"
                  >
                    <ArrowBigUp className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    aria-label="Upvote"
                    onClick={() => toggleUpvote(post.id)}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-cyan-50 hover:text-cyan-700"
                  >
                    <ArrowBigUp className="h-3.5 w-3.5" />
                  </button>
                )}

                <span className="flex min-w-8 items-center justify-center px-2 text-sm font-semibold text-slate-900">
                  {post.vote}
                </span>
                {post.voteAction === "down" ? (
                  <button
                    type="button"
                    aria-label="Downvote"
                    onClick={() => toggleDownvote(post.id)}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full text-slate-400 transition-colors bg-purple-800 hover:text-cyan-700"
                  >
                    <ArrowBigDown className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    aria-label="Downvote"
                    onClick={() => toggleDownvote(post.id)}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-cyan-50 hover:text-cyan-700"
                  >
                    <ArrowBigDown className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {!isCommenting && (
                <button
                  type="button"
                  onClick={() => setIsCommenting(true)}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-cyan-50 hover:text-cyan-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  Comment
                </button>
              )}

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

            {isCommenting && (
              <section className="mt-5 space-y-4 rounded-2xl border border-cyan-100 bg-linear-to-b from-cyan-50/80 to-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      Comments
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Leave a note and keep the thread tidy.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsCommenting(false);
                      setInputComment("");
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-cyan-200 hover:text-cyan-700"
                  >
                    Close
                  </button>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  <label className="block space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Write a comment
                    </span>
                    <textarea
                      rows="3"
                      value={inputComment}
                      onChange={(event) => setInputComment(event.target.value)}
                      placeholder="Add your thoughts..."
                      className="min-h-24 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 transition focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100"
                    />
                  </label>
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        createComment(inputComment, post.id);
                        setInputComment("");
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-cyan-200 hover:text-cyan-700"
                    >
                      Post
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Thread
                    </span>
                    <span className="text-xs text-slate-400">2 comments</span>
                  </div>

                  <div className="space-y-3">
                    {post.comments.map((comment) => (
                      <article
                        key={comment.id}
                        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                      >
                        <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                          <span className="h-2 w-2 rounded-full bg-cyan-500" />
                          <span className="font-semibold text-slate-700">
                            {comment.username}
                          </span>
                          <span>Just now</span>
                        </div>
                        <p className="text-sm leading-6 text-slate-600">
                          {comment.content}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
