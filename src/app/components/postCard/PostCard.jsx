import { useState } from "react";
import { MessageCircle, Share2, PencilLine, Trash2 } from "lucide-react";
import EditPost from "../editPost/EditPost";
import CommentCard from "../commentCard/CommentCard";
import PostVote from "../postVotes/PostVote";

export default function PostCard({
  post,
  deletePost,
  editPost,
  toggleUpvote,
  toggleDownvote,
  createComment,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  function getTimestamp(createdAt) {
    const seconds = Math.floor((Date.now() - createdAt) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return seconds === 1 ? `${seconds} second ago` : `${seconds} seconds ago`;
    }
    if (minutes < 60) {
      return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
    }
    if (hours < 24) {
      return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
    }
    if (days < 365) {
      return days === 1 ? `${days} day ago` : `${days} days ago`;
    }
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md">
      {isEditing ? (
        <EditPost
          post={post}
          editPost={editPost}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      ) : (
        <div className="flex">
          <div className="min-w-0 flex-1 p-5">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <span className="flex mb-1 text-xs text-slate-500">
                  r/shrimpapp •{getTimestamp(post.createdAt)}
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
              <PostVote
                post={post}
                toggleUpvote={toggleUpvote}
                toggleDownvote={toggleDownvote}
              />
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
              <CommentCard
                postId={post.id}
                comments={post.comments}
                createComment={createComment}
                setIsCommenting={setIsCommenting}
              />
            )}
          </div>
        </div>
      )}
    </article>
  );
}
