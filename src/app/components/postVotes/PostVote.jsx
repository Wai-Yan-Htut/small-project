import { ArrowBigDown, ArrowBigUp } from "lucide-react";

export default function PostVote({ post, toggleUpvote, toggleDownvote }) {
  return (
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
  );
}
