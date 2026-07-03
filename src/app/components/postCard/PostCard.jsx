import Link from "next/link";
import { useContext } from "react";
import PostVote from "../postVotes/PostVote";
import { PostContext } from "../../context/PostContext";
import { getTimestamp } from "../../utils/timestamp/getTimestamp";
import { MessageCircleMore, Share2, EllipsisVertical } from "lucide-react";

export default function PostCard({ post }) {
  const { setIsEditing } = useContext(PostContext);
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md">
      <div className="flex">
        <div className="min-w-0 flex-1 p-5">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="mb-1 flex text-xs text-slate-500">
                r/shrimpapp • {getTimestamp(post.createdAt)}
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
                  <EllipsisVertical className="h-3.5 w-3.5" />
                </span>
              </button>
            </div>
          </div>

          <p className="mb-4 text-sm leading-6 text-slate-600">
            {post.content}
          </p>

          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <PostVote post={post} />

            <Link
              className="ml-1 inline-flex min-w-15 items-center justify-center gap-2 rounded-full px-3 py-1.5 text-sm leading-none font-medium text-slate-600 transition-colors hover:bg-cyan-100 hover:text-cyan-700"
              href={`/posts/${post.id}`}
            >
              <MessageCircleMore className="h-4 w-4 shrink-0" />
              {post.comments.length}
            </Link>

            <button
              type="button"
              className="ml-auto inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:bg-cyan-100 hover:text-cyan-700"
            >
              <span className="inline-flex items-center gap-1.5">
                <Share2 className="h-4 w-4" />
                Share
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
