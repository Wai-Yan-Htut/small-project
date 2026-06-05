import { useState } from "react";

export default function CommentCard({
  postId,
  comments,
  createComment,
  setIsCommenting,
}) {
  const [inputComment, setInputComment] = useState("");

  return (
    <section className="mt-5 space-y-4 rounded-2xl border border-cyan-100 bg-linear-to-b from-cyan-50/80 to-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Comments</h3>
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
              createComment(inputComment, postId);
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
          {comments.map((comment) => (
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
  );
}
