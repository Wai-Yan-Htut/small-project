import { useState } from "react";
import { getTimestamp } from "@/src/app/utils/timestamp/getTimestamp";

export default function CommentCard({
  postId,
  comments,
  createComment,
  deleteComment,
}) {
  const [inputComment, setInputComment] = useState("");

  return (
    <section className="mt-5 space-y-4 rounded-2xl border border-cyan-100 bg-linear-to-b from-cyan-50/80 to-white p-4 shadow-sm">
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <label className="block space-y-2">
          <span className="text-xs font-semibold tracking-[0.12em] text-slate-500 uppercase">
            Write a comment
          </span>
          <textarea
            rows="3"
            value={inputComment}
            onChange={(event) => setInputComment(event.target.value)}
            placeholder="Add your thoughts..."
            className="min-h-24 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100 focus:outline-none"
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
          <span className="text-xs font-semibold tracking-[0.12em] text-slate-500 uppercase">
            Thread
          </span>
          {comments.length === 0 ? (
            <span className="text-xs text-slate-400">no comment yet</span>
          ) : comments.length === 1 ? (
            <span className="text-xs text-slate-400">
              {comments.length} comment
            </span>
          ) : (
            <span className="text-xs text-slate-400">
              {comments.length} comments
            </span>
          )}
        </div>

        <div className="space-y-3">
          {comments.map((comment) => (
            <article
              key={comment.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-cyan-500" />
                  <span className="font-semibold text-slate-700">
                    {comment.username}
                  </span>
                  <span>• {getTimestamp(comment.createdAt)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => deleteComment(postId, comment.id)}
                  className="inline-flex shrink-0 items-center rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[11px] font-semibold text-rose-600 transition-colors hover:border-rose-300 hover:bg-rose-100 hover:text-rose-700"
                >
                  Delete Comment
                </button>
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
